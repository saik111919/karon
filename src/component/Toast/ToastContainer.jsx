import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import Toast from "./Toast";

const ToastContainer = forwardRef((props, ref) => {
  const [toasts, setToasts] = useState([]);
  const timeoutDuration = 3000; // Time in milliseconds before the toast closes automatically

  useImperativeHandle(ref, () => ({
    addToast: (message, type) => {
      const id = Date.now();
      setToasts((prevToasts) => [
        ...prevToasts,
        { id, message, type, createdAt: id },
      ]);
    },
  }));

  useEffect(() => {
    const now = Date.now();
    const timers = toasts.map((toast) => {
      const timeElapsed = now - toast.createdAt;
      const remainingTime = timeoutDuration - timeElapsed;

      return setTimeout(
        () => {
          setToasts((prevToasts) =>
            prevToasts.filter((t) => t.id !== toast.id)
          );
        },
        remainingTime > 0 ? remainingTime : 0
      );
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [toasts]);

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <div className='fixed top-3 right-0 space-y-2 max-w-sm w-full'>
      {toasts.map(({ id, message, type }) => (
        <Toast
          key={id}
          message={message}
          type={type}
          onClose={() => removeToast(id)}
          className='animate-toast-in' // Add animation class here
        />
      ))}
    </div>
  );
});

ToastContainer.displayName = "ToastContainer";

export default ToastContainer;
