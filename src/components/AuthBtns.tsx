"use client"

import React from 'react';
import AuthButton from './AuthBtn';
import styles from "@/app/login/page.module.css";
import { login } from '@/lib/auth/login';

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
    { name: 'discord', disabled: false },
    { name: 'google', disabled: false },
    { name: 'github', disabled: false },
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