import React, { useState, useRef } from 'react';
import * as api from '../services/api';

export default function FileUploader({ onUploadComplete }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadState, setUploadState] = useState('idle'); // idle | uploading | success | error
  const [fileName, setFileName] = useState('');
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const allowedExtensions = ['pdf', 'txt', 'docx', 'md'];

  const validateAndUpload = async (file) => {
    if (!file) return;

    // Validate Extension
    const fileExt = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      setErrorMessage(`Unsupported file format. Please upload PDF, TXT, DOCX, or MD.`);
      setUploadState('error');
      return;
    }

    // Validate Size (e.g. 10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 10MB limit.');
      setUploadState('error');
      return;
    }

    setFileName(file.name);
    setUploadState('uploading');
    setProgress(0);
    setErrorMessage('');

    try {
      await api.uploadDocument(file, (percent) => {
        setProgress(percent);
      });
      setUploadState('success');
      if (onUploadComplete) {
        onUploadComplete();
      }
      // Return to idle after a few seconds
      setTimeout(() => {
        setUploadState('idle');
        setFileName('');
        setProgress(0);
      }, 3000);
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred during upload.');
      setUploadState('error');
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndUpload(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        multiple={false}
        onChange={handleFileChange}
        accept=".pdf,.txt,.docx,.md"
      />

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        style={{
          width: '100%',
          minHeight: '220px',
          border: dragActive ? '2px dashed var(--accent-purple)' : '2px dashed var(--border-color)',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          backgroundColor: dragActive ? 'hsla(263, 85%, 65%, 0.05)' : 'transparent',
          cursor: uploadState === 'uploading' ? 'not-allowed' : 'pointer',
          transition: 'all 0.3s ease',
          outline: 'none'
        }}
        onClick={uploadState !== 'uploading' ? onButtonClick : null}
      >
        {uploadState === 'idle' && (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'hsla(240, 20%, 30%, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              color: 'var(--text-secondary)'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <polyline points="9 15 12 12 15 15"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Drag & drop files here</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              or <span style={{ color: 'var(--accent-purple)', fontWeight: '600' }}>browse your local files</span>
            </p>
            <span className="badge badge-blue">PDF, TXT, DOCX, MD (Max 10MB)</span>
          </div>
        )}

        {uploadState === 'uploading' && (
          <div style={{ width: '100%', maxWidth: '380px', textAlign: 'center' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'hsla(210, 100%, 60%, 0.1)',
              color: 'var(--accent-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1.5s linear infinite' }}>
                <circle cx="12" cy="12" r="10" strokeDasharray="30 10"/>
              </svg>
            </div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Uploading knowledge file</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {fileName}
            </p>
            
            {/* Progress Bar Container */}
            <div style={{ width: '100%', height: '6px', background: 'var(--border-color)', borderRadius: '99px', overflow: 'hidden', marginBottom: '8px' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(to right, var(--accent-blue), var(--accent-purple))', borderRadius: '99px', transition: 'width 0.2s ease-out' }}></div>
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)' }}>{progress}% Uploaded</span>
          </div>
        )}

        {uploadState === 'success' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'hsla(142, 70%, 45%, 0.15)',
              color: 'var(--accent-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 0 16px hsla(142, 70%, 45%, 0.2)'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', color: 'var(--accent-emerald)' }}>Upload Complete!</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              "{fileName}" is being parsed and indexed.
            </p>
          </div>
        )}

        {uploadState === 'error' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'hsla(350, 80%, 60%, 0.15)',
              color: 'var(--accent-rose)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 0 16px hsla(350, 80%, 60%, 0.2)'
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '6px', color: 'var(--accent-rose)' }}>Upload Failed</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {errorMessage}
            </p>
            <button className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>Try Again</button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
