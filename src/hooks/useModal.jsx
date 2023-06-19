import { cloneElement, useCallback, useEffect, useState } from 'react';
import Modal from '../components/ui/modal/Modal';
import { useClickOutside } from './useClickOutside';

export default function useModal(children) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(e => {
    e?.stopPropagation();
    setIsModalOpen(true);
  }, []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  const containerRef = useClickOutside(closeModal);

  useEffect(() => {
    if (!isModalOpen) return;
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, [isModalOpen]);

  const ModalWrapper = () => (
    <Modal>
      <div ref={containerRef}>
        {cloneElement(children, {
          closeModal,
          openModal,
        })}
      </div>
    </Modal>
  );

  return { Modal: ModalWrapper, isModalOpen, openModal, closeModal };
}
