import ThemeComp from "../../component/Theme/ThemeComp";
import useTheme from "../../hooks/useTheme";

const Settings = () => {
  const [isDarkTheme, toggleTheme] = useTheme();

  return (
    <div>
      <ul>
        <li>
          <ThemeComp isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
        </li>
      </ul>
    </div>
  );
};
export default Settings;
