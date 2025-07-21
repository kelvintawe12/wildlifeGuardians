const axios = require('axios');

async function testUserCreation() {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'testuser',
      email: 'testuser@example.com',
      password: 'TestPassword123!',
      confirmPassword: 'TestPassword123!'
    });
    console.log('User creation response:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
      console.error('Error data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

async function testUserLogin() {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'testuser@example.com',
      password: 'TestPassword123!'
    });
    console.log('User login response:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Login error status:', error.response.status);
      console.error('Login error headers:', error.response.headers);
      console.error('Login error data:', error.response.data);
    } else {
      console.error('Login error:', error.message);
    }
  }
}

async function runTests() {
  console.log('Starting backend endpoint tests...');
  await testUserCreation();
  await testUserLogin();
  console.log('Tests completed.');
}

runTests();
