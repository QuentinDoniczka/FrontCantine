import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import ActionButton from '../actionButton/ActionButton.tsx';
import { login } from '../../api/auth.ts';

interface LoginProps {
  onSwitchModal: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      localStorage.setItem('jwtToken', data.token);
      console.log('Login successful:', data);
      navigate('/');
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="container mt-4">
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.group}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.group}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.group_button}>
          <ActionButton
            text={'Login'}
            theme={3}
            height={'35px'}
            width={'100px'}
            font_size={18}
            shadow={false}
          />
          <ActionButton
            text={'Register'}
            theme={4}
            height={'35px'}
            width={'100px'}
            font_size={18}
            shadow={false}
            onClick={onSwitchModal}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
