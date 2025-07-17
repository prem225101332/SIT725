async function calculate() {
    const num1 = document.getElementById('num1').value;
    const num2 = document.getElementById('num2').value;
    
    if (!num1 || !num2) {
      document.getElementById('result').textContent = 'Please enter both numbers';
      return;
    }
  
    try {
      const response = await fetch(`/add?num1=${num1}&num2=${num2}`);
      const data = await response.json();
      
      if (response.ok) {
        document.getElementById('result').textContent = `Result: ${data.result}`;
      } else {
        document.getElementById('result').textContent = `Error: ${data.error}`;
      }
    } catch (error) {
      document.getElementById('result').textContent = 'Error connecting to server';
    }
}