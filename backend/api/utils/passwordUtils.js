// utils/passwordUtils.js - Utilitários para senhas seguras
const bcrypt = require('bcryptjs');

class PasswordUtils {
  /**
   * Gera hash seguro da senha
   * @param {string} password - Senha em texto plano
   * @returns {Promise<string>} Hash da senha
   */
  static async hashPassword(password) {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  /**
   * Verifica se a senha corresponde ao hash
   * @param {string} password - Senha em texto plano
   * @param {string} hash - Hash armazenado
   * @returns {Promise<boolean>} True se a senha estiver correta
   */
  static async verifyPassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }

  /**
   * Valida força da senha
   * @param {string} password - Senha a ser validada
   * @returns {Object} Resultado da validação
   */
  static validatePasswordStrength(password) {
    const result = {
      valid: true,
      score: 0,
      errors: [],
      suggestions: []
    };

    // Verificações básicas
    if (password.length < 8) {
      result.valid = false;
      result.errors.push('Senha deve ter pelo menos 8 caracteres');
    } else {
      result.score += 1;
    }

    if (password.length > 50) {
      result.valid = false;
      result.errors.push('Senha não pode ter mais de 50 caracteres');
    }

    // Verificar caracteres variados
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasLowerCase) result.score += 1;
    if (hasUpperCase) result.score += 1;
    if (hasNumbers) result.score += 1;
    if (hasSpecialChar) result.score += 1;

    // Verificar senhas comuns
    const commonPasswords = [
      '123456', 'password', '12345678', 'qwerty', '123456789',
      'password123', 'admin', 'admin123', '1234567890'
    ];

    if (commonPasswords.includes(password.toLowerCase())) {
      result.valid = false;
      result.errors.push('Senha muito comum, escolha uma senha mais segura');
      result.score = 0;
    }

    // Verificar padrões sequenciais
    if (/(.)\1{2,}/.test(password)) {
      result.errors.push('Evite repetir caracteres consecutivos');
      result.score -= 1;
    }

    if (/123|abc|qwe|asd|zxc/i.test(password)) {
      result.errors.push('Evite sequências obvias de caracteres');
      result.score -= 1;
    }

    // Sugestões baseadas no score
    if (result.score < 3) {
      result.suggestions.push('Use uma combinação de letras maiúsculas e minúsculas');
      result.suggestions.push('Inclua números na sua senha');
      result.suggestions.push('Adicione caracteres especiais (!@#$%^&*)');
    }

    return result;
  }

  /**
   * Gera senha temporária segura
   * @param {number} length - Comprimento da senha
   * @returns {string} Senha temporária
   */
  static generateTemporaryPassword(length = 12) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    
    // Garantir pelo menos um de cada tipo
    password += chars.charAt(Math.floor(Math.random() * 26)); // Maiúscula
    password += chars.charAt(26 + Math.floor(Math.random() * 26)); // Minúscula
    password += chars.charAt(52 + Math.floor(Math.random() * 10)); // Número
    password += chars.charAt(62 + Math.floor(Math.random() * 8)); // Especial

    // Completar o restante aleatoriamente
    for (let i = 4; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Embaralhar a senha
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }
}

module.exports = PasswordUtils;
