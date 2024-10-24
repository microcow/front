interface User {
    index?: number;
    username?: string;
    name?: string;
    email?: string;
    number?: string;
    regisDateTime?: string;
    address?: string;
    point?: number | null;
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