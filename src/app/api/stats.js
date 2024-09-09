export default function handler(req, res) {
    const { timeWindow } = req.query;
  
    // Dummy data based on timeWindow
    const data = {
      pie: {
        labels: ['A', 'B', 'C'],
        datasets: [{
          data: [30, 20, 50],
          backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
        }]
      },
      bar: {
        labels: ['January', 'February', 'March'],
        datasets: [{
          label: 'Sales',
          data: [65, 59, 80],
          backgroundColor: '#42A5F5'
        }]
      },
      line: {
        labels: ['January', 'February', 'March'],
        datasets: [{
          label: 'Revenue',
          data: [100, 200, 150],
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66, 165, 245, 0.2)'
        }]
      },
      table: {
        columns: ['Name', 'Value'],
        data: [['Item A', 30], ['Item B', 20], ['Item C', 50]]
      },
      progress: {
        title: 'Completion',
        value: 70,
        max: 100
      }
    };
  
    res.status(200).json(data);
  }
  