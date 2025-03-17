import React from "react";
import { useAuth } from "hooks";
import "../styles/footer.css";

export default function Footer() {
  const { handleLogout } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <span className="copyright">
            &copy; {currentYear} Sistema de Gerenciamento de Usuários
          </span>
        </div>
        <div className="footer-right">
          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
          >
            <svg
              className="logout-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sair
          </button>
        </div>
      </div>
    </footer>
  );
}
