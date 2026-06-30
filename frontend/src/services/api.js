/**
 * API Service for RAG Chatbot frontend.
 * Provides integration with backend endpoints and a local fallback simulation layer
 * for testing and demonstration purposes.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Simple mock store to keep state in memory when fallback is active
let mockDocuments = [
  { id: '1', name: 'academic_calendar_2026.pdf', size: 307200, status: 'indexed', uploadedAt: '2026-06-25T14:32:00Z', chunksCount: 24 },
  { id: '2', name: 'student_handbook_v2.docx', size: 1258291, status: 'indexed', uploadedAt: '2026-06-26T09:15:00Z', chunksCount: 56 },
  { id: '3', name: 'course_syllabus_cs101.txt', size: 87040, status: 'parsing', uploadedAt: '2026-06-27T18:00:00Z', chunksCount: 0 }
];

let useMock = true; // Fallback to mock API since backend is not connected yet

/**
 * Configure API to run in mock mode or live mode
 */
export const setMockMode = (enable) => {
  useMock = enable;
};

export const getMockMode = () => useMock;

/**
 * Fetch all uploaded documents
 */
export async function getDocuments() {
  if (useMock) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return [...mockDocuments];
  }

  try {
    const response = await fetch(`${API_BASE_URL}/documents`);
    if (!response.ok) throw new Error('Failed to fetch documents');
    return await response.json();
  } catch (error) {
    console.warn('API error, falling back to mock:', error);
    useMock = true;
    return getDocuments();
  }
}

/**
 * Upload a document with simulated upload progress updates
 */
export async function uploadDocument(file, onProgress = () => {}) {
  if (useMock) {
    // Simulate upload progress
    for (let p = 10; p <= 100; p += 20) {
      onProgress(p);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    const newDoc = {
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      status: 'parsing',
      uploadedAt: new Date().toISOString(),
      chunksCount: 0
    };

    mockDocuments = [newDoc, ...mockDocuments];

    // Simulate backend parser running in background
    setTimeout(() => {
      const doc = mockDocuments.find(d => d.id === newDoc.id);
      if (doc) {
        doc.status = 'indexed';
        doc.chunksCount = Math.floor(Math.random() * 30) + 5;
      }
    }, 4000);

    return newDoc;
  }

  try {
    const formData = new FormData();
    formData.append('file', file);

    // Standard XMLHttpRequest or Fetch with progress tracking (for custom axios or xhr)
    // Here we use XMLHttpRequest for upload progress tracking
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${API_BASE_URL}/documents/upload`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          onProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(new Error(`Upload failed: ${xhr.statusText}`));
        }
      };

      xhr.onerror = () => reject(new Error('Network error during upload'));
      xhr.send(formData);
    });
  } catch (error) {
    console.warn('Upload error, falling back to mock:', error);
    useMock = true;
    return uploadDocument(file, onProgress);
  }
}

/**
 * Delete a document from the index
 */
export async function deleteDocument(id) {
  if (useMock) {
    await new Promise(resolve => setTimeout(resolve, 500));
    mockDocuments = mockDocuments.filter(doc => doc.id !== id);
    return { success: true };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete document');
    return await response.json();
  } catch (error) {
    console.warn('API error, falling back to mock:', error);
    useMock = true;
    return deleteDocument(id);
  }
}

/**
 * Send chat message and get response with RAG sources
 */
export async function sendChatMessage(message, history = []) {
  if (useMock) {
    await new Promise(resolve => setTimeout(resolve, 1500)); // simulate LLM response time

    const lowercaseMsg = message.toLowerCase();
    let text = `I've analyzed your question relative to the institutional knowledge base. Based on the loaded academic files, here is what I found:

To assist you with "${message}", I searched the indexed academic catalog and student files. Here are the core findings:
1. The institution operates under standardized registration and grading criteria.
2. For specific term schedules and deadlines, please consult the Academic Calendar.

Please let me know if you would like me to retrieve details from another course syllabus or university policy file!`;

    let sources = [];

    if (lowercaseMsg.includes('calendar') || lowercaseMsg.includes('sem') || lowercaseMsg.includes('date') || lowercaseMsg.includes('holiday') || lowercaseMsg.includes('break')) {
      text = `According to the official **academic_calendar_2026.pdf** (Section 1 - Term Schedules):

- **Fall Semester 2026**: Classes begin on **August 24, 2026**. The last day to add/drop courses is **September 4, 2026**.
- **Midterm Examinations**: Scheduled between **October 12 and October 16, 2026**.
- **Winter Recess**: Begins at the conclusion of finals on **December 18, 2026**, with classes resuming for the Spring term on **January 11, 2027**.`;
      sources = [
        {
          id: 's1',
          fileName: 'academic_calendar_2026.pdf',
          chunkIndex: 3,
          content: 'Term Schedule Fall 2026: Academic instruction commences Monday, August 24. Course adjustments (add/drop window) must be finalized by midnight on September 4.',
          score: 0.95
        },
        {
          id: 's2',
          fileName: 'academic_calendar_2026.pdf',
          chunkIndex: 6,
          content: 'Exams and Recesses: Midterm evaluations run from Oct 12-16. Final exams conclude on Dec 18, triggering the winter recess until Jan 11.',
          score: 0.88
        }
      ];
    } else if (lowercaseMsg.includes('grading') || lowercaseMsg.includes('gpa') || lowercaseMsg.includes('exam') || lowercaseMsg.includes('credit') || lowercaseMsg.includes('passing')) {
      text = `According to the **student_handbook_v2.docx** (Chapter 4 - Academic Regulations):

- **Grading Scale**: Letter grades range from **A (4.0 points)** down to **F (0.0 points)**.
- **Passing Criteria**: Undergraduate courses require a minimum grade of **D (1.0 points)** to receive credits, though major-specific courses often mandate a **C (2.0 points)** or higher.
- **Academic Standing**: Students must maintain a cumulative Grade Point Average (GPA) of **2.0 or higher** to remain in good academic standing. Falling below this threshold triggers academic probation.`;
      sources = [
        {
          id: 's3',
          fileName: 'student_handbook_v2.docx',
          chunkIndex: 14,
          content: 'Chapter 4.2: Grading Standards. GPA is calculated on a 4.0 scale. Academic probation status is automatically assigned to any student whose cumulative GPA drops below 2.0.',
          score: 0.91
        },
        {
          id: 's4',
          fileName: 'student_handbook_v2.docx',
          chunkIndex: 18,
          content: 'Degree Credit Requirements: Minimum passing grade for elective credits is D (1.0). Core department major courses require a minimum grade of C (2.0).',
          score: 0.83
        }
      ];
    } else if (lowercaseMsg.includes('course') || lowercaseMsg.includes('syllabus') || lowercaseMsg.includes('cs101') || lowercaseMsg.includes('science')) {
      text = `Based on the **course_syllabus_cs101.txt** (Introduction to Computer Science):

- **Course Code**: CS101 (4 Credits)
- **Topics Covered**: Procedural programming, introduction to Object-Oriented design, basic data structures (arrays, linked lists), and algorithmic complexity.
- **Grading Breakdown**:
  - Programming Assignments: **40%**
  - Midterm Exam: **25%**
  - Final Project: **25%**
  - Class Participation: **10%**`;
      sources = [
        {
          id: 's5',
          fileName: 'course_syllabus_cs101.txt',
          chunkIndex: 1,
          content: 'Course Overview: CS101 is a foundational 4-credit course covering algorithm design, execution analysis, OOP paradigms, and coding in Python.',
          score: 0.93
        }
      ];
    } else {
      sources = [
        {
          id: 's6',
          fileName: 'student_handbook_v2.docx',
          chunkIndex: 2,
          content: 'Institutional Directory & General FAQ: For general academic inquiries, registry submissions, financial aid status, and campus facilities contact lists, consult the index page.',
          score: 0.71
        }
      ];
    }

    return {
      text,
      sources,
      timestamp: new Date().toISOString()
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) throw new Error('Chat request failed');
    return await response.json();
  } catch (error) {
    console.warn('API error, falling back to mock:', error);
    useMock = true;
    return sendChatMessage(message, history);
  }
}
