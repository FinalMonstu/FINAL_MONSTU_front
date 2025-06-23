import { createContext, useContext, useCallback } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

/* 
  역할 : 화면에 메시지 표시
  인증 : 모든 이용자 사용가능
  비고 : Mui 라이브러리의  SnackContext 활용
*/
const SnackContext = createContext(() => {});

export function useSnack() {
  return useContext(SnackContext);
}


function InnerSnackProvider({ children }) {
  const { enqueueSnackbar } = useSnackbar();
  const showSnack = useCallback(
    (variant, msg) => {
      enqueueSnackbar(msg, { variant });
    },
    [enqueueSnackbar]
  );

  return (
    <SnackContext.Provider value={showSnack}>
      {children}
    </SnackContext.Provider>
  );
}

// 4) 최상위 Provider 컴포넌트
export default function MultiSnackBar({ children }) {
  return (
    <SnackbarProvider maxSnack={3}>
      <InnerSnackProvider>
        {children}
      </InnerSnackProvider>
    </SnackbarProvider>
  );
}
