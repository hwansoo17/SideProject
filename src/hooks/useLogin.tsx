// import { useMutation } from '@tanstack/react-query';
// import { loginUser, LoginData, LoginResponse } from '../api/auth';

// export const useLogin = () => {
//   return useMutation<LoginResponse, Error, LoginData>(loginUser, {
//     onSuccess: (data) => {
//       // 로그인 성공 시 처리할 로직
//       // 예: 토큰 저장, 사용자 정보 상태 업데이트 등
//       console.log('Login successful:', data);
//     },
//     onError: (error) => {
//       // 로그인 실패 시 처리할 로직
//       console.error('Login failed:', error.message);
//     },
//   });
// };
