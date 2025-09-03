// Test email search functionality
const testEmailSearch = async () => {
  try {
    console.log('Testing email search...');
    
    // Test without email filter
    const allBookings = await fetch('http://localhost:3001/api/bookings');
    const allData = await allBookings.json();
    console.log('All bookings count:', allData.length);
    
    // Test with email filter
    const emailBookings = await fetch('http://localhost:3001/api/bookings?email=shireliwinosa@gmail.com');
    const emailData = await emailBookings.json();
    console.log('Email search results:', emailData.length);
    console.log('Email search data:', emailData);
    
  } catch (error) {
    console.error('Test failed:', error);
  }
};

testEmailSearch();
