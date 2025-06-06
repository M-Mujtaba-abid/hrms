import { createContext, useState, useContext } from 'react';
import DeleteModal from '../model/DeleteModal';

const DeleteContext = createContext();

export const useDelete = () => useContext(DeleteContext);

export const DeleteProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState(() => {});
  const [message, setMessage] = useState("Are you sure you want to delete?");

  const showDelete = (callback, customMessage) => {
    setOnConfirm(() => () => {
      callback();
      setIsOpen(false);
    });
    setMessage(customMessage || "Are you sure you want to delete?");
    setIsOpen(true);
  };

  return (
    <DeleteContext.Provider value={{ showDelete }}>
      {children}
      <DeleteModal
        isOpen={isOpen}
        onConfirm={onConfirm}
        onCancel={() => setIsOpen(false)}
        message={message}
      />
    </DeleteContext.Provider>
  );
};
