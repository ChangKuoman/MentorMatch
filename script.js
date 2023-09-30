
function fun() {
  const url = 'https://fjmjpibq48.execute-api.us-east-1.amazonaws.com/test/';

  const headers = {
    'Content-Type': 'application/json',
  };

  const email = 'example@google.com';
  const course = 'CS2041';

  fetch(url + 'publications', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      'course': course
    }),
  }).then(response => response.json())
    .then(data=> {
      if (data.status === 200){
        console.log(data)
        // STEP 1: FILTER ACTIVE = TRUE
        // const filteredItems = data.data.filter((item) => item.active === true);
        // console.log(filteredItems)
        // THIS WAS ALREADY DONE IN BACKEND XD
        // STEP 2: FILTER email_giver musn't be same user
        const filteredItems = data.data.filter((item) => item.email !== email);
        console.log(filteredItems)

        fetch(url + 'events', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            'email': email,
            'course': course
          }),
        }).then(response2 => response2.json())
          .then(data2=> {
            if (data2.status === 200){
              console.log(data2)
              // STEP 3: STATE IS 0 or 1
              const filter = data2.events.filter((item) => item.state in [0, 1]);
              console.log(filter)

              // STEP 4: get set of emails active
              const uniqueEmailGiversSet = new Set()
              for (const item of data2.events) {
                uniqueEmailGiversSet.add(item.email_giver)
              }
              const uniqueEmailGiversList = [...uniqueEmailGiversSet]
              console.log(uniqueEmailGiversSet)
              console.log(uniqueEmailGiversList)

              // STEP 5: email in publications can't be on uniqueEmailGiversList
              const lastFilter = filteredItems.filter((item) => uniqueEmailGiversList.includes(item.email));
              console.log(lastFilter)

              // STEP 6: if lastFilter is len(0) there are no :c
            }
            else {
              alert(data2.status)
            }
          })
          .catch(error2 => {
            alert(error2);
          });
      }
      else {
        alert(data.status)
      }
    })
    .catch(error => {
      alert(error);
    });
}


