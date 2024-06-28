"use client"

import React from 'react';
import AuthButton from './AuthBtn';
import styles from "@/app/login/page.module.css";
import { login } from '@/app/auth/login';

type Styles = {
  authBtn: string;
  provPics: string;
  [key: string]: string;
}

const AuthButtons: React.FC = () => {
    
    async function handleLogin(provider: string) {
        await login(provider)
        window.location.href = "/"
      }

  const providers = [
    { name: 'Discord', disabled: false },
    { name: 'Google', disabled: false },
    { name: 'Github', disabled: true },
    { name: 'Twitter', disabled: true }
  ];

  return (
    <div>
      {providers.map(({ name, disabled }) => (
        <AuthButton
          key={name}
          provider={name}
          disabled={disabled}
          styles={styles as Styles}
          handleLogin={handleLogin}
        />
      ))}
    </div>
  );
};

export default AuthButtons;