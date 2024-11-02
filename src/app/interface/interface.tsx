interface User {
    index?: string;
    username?: string;
    name?: string;
    email?: string;
    number?: string;
    regisDateTime?: string;
    address?: string;
    point?: string;
    auth?: string;
    enabled?: boolean;
    credentialsNonExpired?: boolean;
    accountNonExpired?: boolean;
    accountNonLocked?: boolean;
  }

interface auth {
    authority : string;
  }

interface SubmitButtonProps {
    text: string;
    loadingText: string;
    className?: string;
    loading?: boolean;
  }

interface UserNameProps {
    username: string;
  }

interface Category {
  code? : string;
  lgcategory? : string;
  smcategory? : string;
  level? : string;
}