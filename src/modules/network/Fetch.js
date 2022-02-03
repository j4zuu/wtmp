// Async function with error handling
const getFood = async () => {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  let response;
  try {
    response = await fetch(`https://www.sodexo.fi/ruokalistat/output/daily_json/152/${today}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('getFood error', error.message);
  }
  return await response.json();
};
export {getFood};
