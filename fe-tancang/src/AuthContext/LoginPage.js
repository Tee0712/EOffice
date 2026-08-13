import React, { useCallback, useEffect, useContext } from "react";
import backgroundTcLogin from "@assets/imgBackground/backgroundTCLogin.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import {
  BoxLoginForm,
  ErrorContainer,
  ErrorText,
  LoaderWrapper,
  LoadingBar,
  LoadingContainer,
  LoadingLabel,
  LoginPageContainerGrid,
  LoginPageLeftContainer,
  LoginPageRightContainer,
  // LoginPageContainer,
  // LoginFormPaper,
  // BoxImgLogoForm,
  LoginTitle,
  ReloadButton,
  SubTitleLogin,
} from "./LoginPage.styles";
// import logoTCLogin from "@assets/imgBackground/logoTCLogin.png";
// import nameLogoTCLogin from "@assets/imgBackground/nameLogoTCLogin.png";
import authService from "@services/AuthService";

const LoginPage = () => {
  const { authConfig, loading, error, initializeAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [localError, setLocalError] = React.useState(null);
  const handleReload = useCallback(() => {
    sessionStorage.removeItem("auth_retry_count"); // Reset bộ đếm khi chủ động tải lại
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    // Nếu đã có token, chuyển hướng ngay vào trang chủ.
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
      return;
    }

    if (authConfig && authConfig.authType !== "local") {
      // Gọi login của AuthService cho các loại SSO (WSO2, Keycloak)
      // Các Strategy sẽ tự xử lý việc redirect
      authService.setStrategy(authConfig.authType);
      authService.login(authConfig.config).catch((err) => {
        //phát hiện vòng lặp, hiển thị thông báo để dừng redirect
        setLocalError(err.message || "Lỗi chuyển hướng đăng nhập");
      });
    }
  }, [authConfig, navigate]);

  // Hiển thị lỗi cục bộ (ví dụ lỗi vòng lặp) hoặc lỗi từ AuthContext
  const displayError = localError || ( (!authConfig && error) ? error : null );

  if (!loading && displayError) {
    return (
      <ErrorContainer>
        <ErrorText>{displayError}</ErrorText>
        <ReloadButton variant="contained" onClick={handleReload}>
          Thử lại
        </ReloadButton>
      </ErrorContainer>
    );
  }

  if (loading || !authConfig || authConfig.authType !== "local") {
    // Trường hợp 1: Đang lấy cấu hình ban đầu (chưa biết loại nào)
    if (!authConfig) {
      return (
        <LoginPageContainerGrid container>
          <LoginPageLeftContainer item xs={0} md={7} lg={8}>
            <img
              src={backgroundTcLogin}
              alt="Background"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </LoginPageLeftContainer>
          <LoginPageRightContainer item xs={12} md={5} lg={4}>
            <BoxLoginForm>
              <LoaderWrapper fullWidth>
                <LoadingLabel>Đang lấy cấu hình...</LoadingLabel>
                <LoadingBar />
              </LoaderWrapper>
            </BoxLoginForm>
          </LoginPageRightContainer>
        </LoginPageContainerGrid>
      );
    }

    // Trường hợp 2: Đã biết là SSO (Keycloak, WSO2...) và đang chuẩn bị redirect
    return (
      <LoadingContainer>
        <LoaderWrapper>
          <LoadingLabel>Đang chuyển đến trang đăng nhập...</LoadingLabel>
          <LoadingBar />
        </LoaderWrapper>
      </LoadingContainer>
    );
  }

  return (
    // <LoginPageContainer>
    //   <LoginFormPaper elevation={3}>
    //     <LoginTitle variant="h5" component="h1" gutterBottom>
    //       Đăng nhập
    //     </LoginTitle>
    //     <LocalLoginForm />
    //   </LoginFormPaper>
    // </LoginPageContainer>
    <LoginPageContainerGrid container>
      <LoginPageLeftContainer item xs={0} md={7} lg={8}>
        <img
          src={backgroundTcLogin}
          alt="Background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </LoginPageLeftContainer>
      <LoginPageRightContainer item xs={12} md={5} lg={4}>
        <BoxLoginForm>
          {/* <StyledContainerLogoLogin container>
            <GridContainerLogoLeft item xs={12} md="auto">
              <StyleLogoTCLogin
                component="img"
                src={logoTCLogin}
                alt="Image 1"
              />
            </GridContainerLogoLeft>

            <GridContainerLogoRight item xs={12} md>
              <LogoTextContainer>
                <LogoTextPrimary>TỔNG CÔNG TY TÂN CẢNG SÀI GÒN</LogoTextPrimary>
                <LogoTextSecondary>
                  SAIGON NEWPORT CORPORATION
                </LogoTextSecondary>
              </LogoTextContainer>
            </GridContainerLogoRight>
          </StyledContainerLogoLogin> */}

          <LoginTitle variant="h4" component="h1">
            {/* <LoginTitle variant="h4" component="h1" gutterBottom> */}
            Đăng nhập
          </LoginTitle>
          <SubTitleLogin variant="body2">Vui lòng nhập thông tin</SubTitleLogin>
        </BoxLoginForm>
      </LoginPageRightContainer>
    </LoginPageContainerGrid>
  );
};

export default LoginPage;
