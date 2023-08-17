import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { requestLogin } from '@/apis/Login';
import Logo from '@/assets/Logo.svg';

interface StyledPasswordIconProps {
  password: string;
}

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [centercode, setCentercode] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [changeUser, setChangeUser] = useState(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleButtonDisabled = useCallback(() => {
    if (username.length != 0 && password.length != 0) {
      setIsButtonDisabled(false);
    }
  }, [password.length, username.length]);

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        const response = await requestLogin(username, password);
        if (response?.status === 200) {
          navigate('/record');
        }
      } catch (error) {
        setError(true);
      }
    },
    [username, password, navigate]
  );

  return (
    <StyledLoginForm onSubmit={handleSubmit}>
      <StyledImg src={Logo} alt="logo" />
      <StyledUl>
        <StyledLi onClick={() => setChangeUser(false)} clicked={!changeUser}>
          관리자 로그인
        </StyledLi>
        <StyledLi onClick={() => setChangeUser(true)} clicked={changeUser}>
          직원 로그인
        </StyledLi>
      </StyledUl>
      {changeUser && (
        <div>
          <label htmlFor="centercode">센터코드</label>
          <br />
          <StyledInput
            type="text"
            id="centercode"
            value={centercode}
            onChange={e => setCentercode(e.target.value)}
          />
        </div>
      )}
      <div>
        <label htmlFor="username">아이디</label>
        <br />
        <StyledInput
          type="text"
          id="username"
          value={username}
          onChange={e => {
            setUsername(e.target.value);
            handleButtonDisabled();
          }}
        />
      </div>
      <StyledDivInput>
        <label htmlFor="password">비밀번호</label>
        <br />
        <StyledInput
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            handleButtonDisabled();
          }}
        />
        <StyledPasswordIcon password={password}>
          <AiOutlineEye
            onClick={() => {
              setShowPassword(prevShowPassword => !prevShowPassword);
            }}
          />
        </StyledPasswordIcon>
      </StyledDivInput>
      <StyledFind>
        <span onClick={() => alert('아이디 찾기 페이지입니다.')}>
          아이디 찾기
        </span>
        <span> / </span>
        <span onClick={() => alert('비밀번호 찾기 페이지입니다.')}>
          비밀번호 찾기
        </span>
      </StyledFind>
      {error && <ErrorMsg>잘못된 비밀번호입니다.</ErrorMsg>}
      <StyledSignup>
        <span>포인티 계정이 없으세요? | </span>
        <span onClick={() => alert('회원가입 페이지입니다.')}>회원가입</span>
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
  width: 78px;
  height: 36px;
  margin-bottom: 48px;
`;

const StyledUl = styled.ul`
  display: flex;
  margin-right: 160px;
  margin-bottom: 24px;
  cursor: pointer;
`;

const StyledLi = styled('li')<{ clicked: boolean }>`
  padding: 0 12px;
  list-style-type: none;
  color: ${props => (props.clicked ? '#6691ff' : '#cfcfcf')};
  border-bottom: ${props =>
    props.clicked ? '2px solid #6691ff' : '1px solid #cfcfcf'};
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

const StyledPasswordIcon = styled.div<StyledPasswordIconProps>`
  position: absolute;
  top: 38px;
  right: 8px;
  font-size: 24px;
  cursor: pointer;
  display: ${props => (props.password.length !== 0 ? 'block' : 'none')};
`;

const StyledFind = styled.div`
  color: #505050;
  margin-right: 192px;
  cursor: pointer;
  margin-bottom: 94px;
`;

const StyledSignup = styled.div`
  color: #505050;
  margin-top: 1rem;
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

const ErrorMsg = styled.span`
  color: red;
  font-size: 14px;
`;
