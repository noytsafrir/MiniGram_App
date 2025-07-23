export function validateEmail(rawEmail: string): {
  isValid: boolean;
  normalized: string;
  error?: string;
} {
  const normalized = rawEmail.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!normalized) {
    return { isValid: false, normalized, error: 'Email is required.' };
  }

  if (!emailRegex.test(normalized)) {
    return { isValid: false, normalized, error: 'Invalid email format.' };
  }

  return { isValid: true, normalized };
}

export function validatePassword(password: string): {
  isValid: boolean;
  error?: string;
} {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{10,}$/;

  if (!password) {
    return { isValid: false, error: "Password is required." };
  }

  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      error:
        "Password must be at least 10 characters long and include uppercase, lowercase, numbers, and special characters.",
    };
  }

  return { isValid: true };
}