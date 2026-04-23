import { useState } from "react";
import Modal from "./Modal";
import { login as loginApi } from "../services/api";
import { useAuthStore } from "../store/useAuthStore";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const authLogin = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

     try {
      const data = await loginApi(email, password);

      authLogin(data.token, data.name);

      setEmail("");
      setPassword("");

      onClose();
    } catch (err) {
      setError("Virheelliset tunnukset");
    }
  };

  return (
    
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="bg-[#A2D135] text-black p-2 rounded">Login</button>
        <button type="button" onClick={onClose}>Close</button>
        {error && (
          <p className="text-red-500 text-sm">
            {error}
          </p>
        )}
      </form>
    </Modal>
  );
}