import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Menu as BaseMenu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem } from '@mui/base/MenuItem';
import { Dropdown } from '@mui/base/Dropdown';
import { useTheme } from '@mui/system';
import { useSelector } from 'react-redux';
import {BsBellFill} from "react-icons/bs"
function useIsDarkMode() {
    const state=useSelector(state=>state.user.value)
  return state.nightDayMode;
}

export default function MenuIntroduction() {
    const state=useSelector(state=>state.user.value)
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  const createHandleMenuClick = (menuItem) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <Dropdown>
        <MenuButton>            <BsBellFill  className={` ${state.nightDayMode===false?"text-black/80":"text-white "}  mt-4 cursor-pointer`} size={"21"}/>
</MenuButton>
        <Menu>
          <MenuItem onClick={createHandleMenuClick('Profile')}>Profile</MenuItem>
          <MenuItem onClick={createHandleMenuClick('Language settings')}>
            Language settings
          </MenuItem>
          <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
          <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
          <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
          <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
          <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
          <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
          <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
        </Menu>
      </Dropdown>
    </div>
  );
}

const resolveSlotProps = (fn, args) => (typeof fn === 'function' ? fn(args) : fn);

const Menu = React.forwardRef((props, ref) => {
  // Replace this with your app logic for determining dark modes
  const isDarkMode = useIsDarkMode();

  return (
    <BaseMenu
      ref={ref}
      {...props}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `${isDarkMode ? 'dark' : ''} z-10`,
              resolvedSlotProps?.className,
            ),
          };
        },
        listbox: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.listbox,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'text-sm box-border h-[300px] overflow-y-scroll hidden md:block w-[350px] font-sans p-1.5 my-3 mx-0 rounded-xl overflow-auto outline-0 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 min-w-listbox shadow-md dark:shadow-slate-900',
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});

Menu.propTypes = {
  /**
   * The props used for each slot inside the Menu.
   * @default {}
   */
  slotProps: PropTypes.shape({
    listbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
};

const MenuButton = React.forwardRef((props, ref) => {
  const { className, ...other } = props;
  return (
    <BaseMenuButton
      ref={ref}
      {...other}
    />
  );
});

MenuButton.propTypes = {
  /**
   * Class name applied to the root element.
   */
  className: PropTypes.string,
};

const MenuItem = React.forwardRef((props, ref) => {
  const { className, ...other } = props;
  return (
    <BaseMenuItem
      ref={ref}
      className={clsx(
        'list-none p-4 rounded-lg cursor-default select-none last-of-type:border-b-0 focus-visible:shadow-outline-purple focus-visible:outline-0 focus-visible:bg-slate-100 focus-visible:dark:bg-slate-800 focus-visible-text-slate-900 focus-visible:dark:text-slate-300 disabled:text-slate-400 disabled:dark:text-slate-700 disabled:hover:text-slate-400 disabled:hover:dark:text-slate-700 hover:bg-purple-50 hover:dark:bg-purple-950 hover:text-slate-900 hover:dark:text-slate-300',
        className,
      )}
      {...other}
    />
  );
});

MenuItem.propTypes = {
  className: PropTypes.string,
};