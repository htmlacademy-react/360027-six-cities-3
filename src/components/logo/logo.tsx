import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { AppRoute } from '@/const';
import { Size } from '@/types/size';

type LogoType = 'header' | 'footer';

type LogoProps = {
  type: LogoType;
  isActive?: boolean;
};

const LogoTypeToSize: Record<LogoType, Size> = {
  header: {
    width: 81,
    height: 41,
  },
  footer: {
    width: 64,
    height: 33,
  },
};

function Logo({ type, isActive = false }: LogoProps): JSX.Element {
  const { width, height } = LogoTypeToSize[type];

  return (
    <Link
      className={clsx(
        `${type}__logo-link`,
        isActive && `${type}__logo-link--active`,
      )}
      to={AppRoute.Root}
    >
      <img
        className={`${type}__logo`}
        src="img/logo.svg"
        alt="6 cities logo"
        width={width}
        height={height}
      />
    </Link>
  );
}

export default Logo;
