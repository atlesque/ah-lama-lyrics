import { useAtom } from 'jotai';
import { settingsAtom } from '../../../atoms/settings';
import { Settings } from '../../../types/settings';
import Input from '../../shared/Input';

import styles from './SettingsForm.module.scss';

const SettingsForm = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  const handleChangeSettings = (newSettings: Settings): void => {
    setSettings(newSettings);
  };

  return (
    <div className={styles.root}>
      <ul>
        <li className={styles.checkboxWrapper}>
          <Input
            id="checkbox-showTibetan"
            type="checkbox"
            checked={settings.showTibetan}
            onChange={() =>
              handleChangeSettings({ ...settings, showTibetan: !settings.showTibetan })
            }
          />
          <label htmlFor="checkbox-showTibetan">Show tibetan</label>
        </li>
        <li className={styles.checkboxWrapper}>
          <Input
            id="checkbox-autoFollowLyricsList"
            type="checkbox"
            checked={settings.autoFollowLyricsList}
            onChange={() =>
              handleChangeSettings({
                ...settings,
                autoFollowLyricsList: !settings.autoFollowLyricsList,
              })
            }
          />
          <label htmlFor="checkbox-autoFollowLyricsList">Auto-follow lyrics</label>
        </li>
        <li className={styles.checkboxWrapper}>
          <Input
            id="checkbox-showPresentationControls"
            type="checkbox"
            checked={settings.showPresentationControls}
            onChange={() =>
              handleChangeSettings({
                ...settings,
                showPresentationControls: !settings.showPresentationControls,
              })
            }
          />
          <label htmlFor="checkbox-showPresentationControls">Show presentation controls</label>
        </li>
        <li className={styles.checkboxWrapper}>
          <Input
            id="checkbox-showImageInput"
            type="checkbox"
            checked={settings.showImageInput}
            onChange={() =>
              handleChangeSettings({
                ...settings,
                showImageInput: !settings.showImageInput,
              })
            }
          />
          <label htmlFor="checkbox-showImageInput">Show image input</label>
        </li>
      </ul>
      <Input
        placeholder="Text zoom level"
        type="number"
        step={0.1}
        min={0}
        value={settings.presentationZoomLevel}
        onChange={e =>
          handleChangeSettings({
            ...settings,
            presentationZoomLevel: parseFloat(parseFloat(e.currentTarget.value).toFixed(1)),
          })
        }
      />
    </div>
  );
};

export default SettingsForm;
