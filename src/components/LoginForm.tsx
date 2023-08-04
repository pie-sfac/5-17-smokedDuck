import { css } from '@emotion/react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Logo from '@/assets/Logo.svg';
import VisibilityOn from '@/assets/VisibilityOn.svg';
import { MainContext } from '@/store';
import { tokenType } from '@/types/token.interface';
interface StyledPasswordIconProps {
  password: string;
}

export default function LoginForm() {
  axios.defaults.baseURL = 'http://223.130.161.221/api/v1';
  axios.defaults.withCredentials = true;
  const { setLoginToken } = useContext(MainContext);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const isButtonDisabled: boolean =
    username.length === 0 || password.length === 0;

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        const basicToken = btoa(`${username}:${password}`);
        const headers = {
          Authorization: `Basic ${basicToken}`,
        };
        const response = await axios.post<tokenType>(`/admins/login`, '', {
          headers,
        });
        // axios.defaults.headers.common[
        //   'Authorization'
        // ] = `Bearer ${response.data.accessToken}`;
        setLoginToken(response.data.accessToken);
        window.localStorage.setItem('token', response.data.accessToken);
        window.localStorage.setItem('refreshToken', response.data.refreshToken);

        navigate('record');
      } catch (error) {
        alert('아이디 또는 비밀번호가 틀렸습니다.');
        console.error('error');
      }
    },
    [username, password, navigate, setLoginToken]
  );

  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      <StyledImg src={Logo} alt="logo" />
      <StyledUl>
        <StyledLi>관리자 로그인</StyledLi>
        <StyledLi>직원 로그인</StyledLi>
      </StyledUl>
      <div>
        <label htmlFor="username">아이디</label>
        <br />
        <StyledInput
          type="text"
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <StyledDivInput>
        <label htmlFor="password">비밀번호</label>
        <br />
        <StyledInput
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <StyledPasswordIcon
          src={VisibilityOn}
          alt=""
          password={password}
          onClick={() => {
            setShowPassword(prevShowPassword => !prevShowPassword);
          }}
        />
      </StyledDivInput>
      <StyledFind>
        <span>아이디 찾기</span>
        <span> / </span>
        <span>비밀번호 찾기</span>
      </StyledFind>
      <StyledSignup>
        <span>포인티 계정이 없으세요? |</span>
        <span>회원가입</span>
      </StyledSignup>
      <StyledLoginButton type="submit" disabled={isButtonDisabled}>
        로그인
      </StyledLoginButton>
    </StyledLoginForm>
  );
}

const StyledLoginForm = styled.form`
  display: flex;
  position: relative;
  top: 184px;
  flex-direction: column;
  align-items: center;
`;

const StyledImg = styled.img`
  width: 77px;
  height: 35px;
  margin-bottom: 48px;
`;

const StyledUl = styled.ul`
  display: flex;
  margin-right: 160px;
  margin-bottom: 24px;
`;

const StyledLi = styled.li`
  padding: 0 12px;
  list-style-type: none;
  &:first-of-type {
    color: #6691ff;
    border-bottom: 2px solid #6691ff;
  }
  &:last-of-type {
    color: #cfcfcf;
    border-bottom: 1px solid #cfcfcf;
    cursor: pointer;
  }
`;

const StyledInput = styled.input`
  width: 368px;
  border: solid 1px #cfcfcf;
  border-radius: 4px;
  padding: 8px 16px;
  margin-top: 4px;
  margin-bottom: 24px;
`;

const StyledDivInput = styled.div`
  position: relative;
`;

const StyledPasswordIcon = styled.img<StyledPasswordIconProps>`
  position: absolute;
  top: 38px;
  right: 8px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: ${props => (props.password.length !== 0 ? 'block' : 'none')};
`;

const StyledFind = styled.div`
  color: #505050;
  margin-right: 192px;
  cursor: pointer;
`;

const StyledSignup = styled.div`
  color: #505050;
  margin-top: 94px;
  margin-bottom: 16px;
  & span:last-of-type {
    cursor: pointer;
  }
`;

const StyledLoginButton = styled.button`
  border-radius: 4px;
  background-color: #f4f4f4;
  color: #aeaeae;
  width: 312px;
  padding: 12px 16px;
  ${props =>
    !props.disabled &&
    css`
      background-color: #2d62ea;
      color: #fff;
      cursor: pointer;
    `}
`;
