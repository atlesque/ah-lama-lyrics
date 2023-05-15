import Modal, { ModalProps } from '../../shared/Modal';
import SettingsForm from './SettingsForm';

const SettingsModal = ({ onClose }: Pick<ModalProps, 'onClose'>) => {
  return (
    <Modal title="Settings" onClose={onClose}>
      <SettingsForm />
    </Modal>
  );
};

export default SettingsModal;
