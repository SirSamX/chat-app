import React from 'react';

interface AuthButtonProps {
  provider: string;
  disabled?: boolean;
  styles: {
    authBtn: string;
    provPics: string;
    [key: string]: string;
  };
  handleLogin: (provider: string) => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({ provider, disabled = false, styles, handleLogin }) => {
  
  return (
    <button 
      onClick={() => handleLogin(provider)}
      className={`${styles.authBtn} ${styles.provPics}`}
      style={{ '--url': `url("/providers/${provider}.png")` } as React.CSSProperties}
      disabled={disabled}
    >
        {provider}
    </button>
  );
};

export default AuthButton;