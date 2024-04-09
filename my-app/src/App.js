import { useState, useRef } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [formErrors, setFormErrors] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const registerButtonRef = useRef(null);

	const validateEmail = (email) => /\S+@\S+\.\S+/.test(email) || email === '';
	const validatePassword = (password) => (password.length >= 3 && password.length <= 20) || password === '';

	const validateField = (fieldName, value) => {
		let error = '';

		if (fieldName === 'email') error = validateEmail(value) ? '' : 'Некорректный email';
		else if (fieldName === 'password') error = validatePassword(value) ? '' : 'Пароль должен содержать от 3 до 20 символов';
		else if (fieldName === 'confirmPassword') error = value === formData.password ? '' : 'Пароли не совпадают';

		setFormErrors({ ...formErrors, [fieldName]: error });
	};

	const handleInputChange = (fieldName, value) => {
		setFormData({ ...formData, [fieldName]: value });
		validateField(fieldName, value);
		if ((fieldName === 'password' || fieldName === 'confirmPassword') && formData.password === value)
			setFormErrors({ ...formErrors, confirmPassword: '' });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!Object.values(formErrors).every((error) => error === '') || Object.values(formData).some((value) => value === '')) {
			console.log('Форма содержит ошибки. Пожалуйста, исправьте их.');
			return;
		}
		console.log('Данные формы:', formData);
	};

	const focusRegisterButton = () => {
		if (Object.values(formErrors).every((error) => error === '') && Object.values(formData).every((value) => value !== '')) {
			registerButtonRef.current.focus();
		}
	};

	const isFormValid = () =>
		Object.values(formErrors).every((error) => error === '') &&
		formData.email !== '' &&
		formData.password !== '' &&
		formData.confirmPassword !== '';

	focusRegisterButton();

	return (
		<div className={styles.app}>
			<h1>Регистрация</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Email:</label>
					<input type="email" value={formData.email} onChange={(event) => handleInputChange('email', event.target.value)} />
					<span>{!validateEmail(formData.email) ? 'Некорректный email' : formErrors.email}</span>
				</div>
				<div>
					<label>Придумайте пароль:</label>
					<input type="password" value={formData.password} onChange={(event) => handleInputChange('password', event.target.value)} />
					<span>{!validatePassword(formData.password) ? 'Пароль должен содержать от 3 до 20 символов' : formErrors.password}</span>
				</div>
				<div>
					<label>Повторите пароль:</label>
					<input
						type="password"
						value={formData.confirmPassword}
						onChange={(event) => handleInputChange('confirmPassword', event.target.value)}
					/>
					<span>{formErrors.confirmPassword}</span>
				</div>
				<button type="submit" disabled={!isFormValid()}>
					Зарегистрироваться
				</button>
				<button ref={registerButtonRef} style={{ display: 'none' }}></button>
			</form>
		</div>
	);
};
