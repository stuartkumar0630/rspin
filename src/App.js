import React, { useState,useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import Button from 'react-bootstrap/Button';

const defaultData = [{ id: 1, option: "Loading.." }];

export default () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [hasStartedSpinning, setHasStartedSpinning] = useState(false);
  const [hasFinishedSpinning, setHasFinishedSpinning] = useState(false);
  const [data, setData] = useState(defaultData);

  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setHasStartedSpinning(true);
  };

  useEffect(() => {
    console.log("This runs once on first render");

    const spinRef = window.location.href.split('/').reverse()[0];

    fetch('http://localhost:3000/s/' + spinRef)
    .then((response) => response.json())
    .then(
      (data) =>  {
        console.log(data)
        const newData = data.wheel.items.map((e, i) => ({ id: i, option: e}));
        console.log(newData);
        setData(newData);
      });

  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src='https://cdn.pixabay.com/photo/2012/04/05/00/32/lemon-25342_960_720.png' alt="" width="30" height="24" />
            <span> Signmeant</span>
          </a>
        </div>
      </nav>

      <div className='card-container'>

        
        <div className="card m-3">

            <div className="card-header">
              Thurdays's Activity
            </div>

            {data === defaultData && 
              <p>hi</p>
              ||
                <div className='m-3 wheel-container'> 
                  <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}  
                    data={data}
                    outerBorderColor={["#f2f2f2"]}
                    outerBorderWidth={[25]}
                    innerBorderColor={["#f2f2f2"]}
                    radiusLineColor={["#dedede"]}
                    radiusLineWidth={[0]}
                    textColors={["#ffffff"]}
                    fontSize={[25]}
                    perpendicularText={[true]}
                    backgroundColors={[
                      "#942f54",
                      "#d35e5f",
                      "#e2b58c"
                    ]}
                    onStopSpinning={() => {
                      setMustSpin(false);
                      setHasFinishedSpinning(true);
                    }}
                />
               </div>
            }
            

        

        <div className="card-body">
        
         <div className='row m-3 text-center'>

            { !hasStartedSpinning && !hasFinishedSpinning &&
              <Button className="btn-lg" onClick={handleSpinClick}> Spin </Button> 
            }

            { hasStartedSpinning && !hasFinishedSpinning &&
              <h2 className='px-0'>Result: ?</h2>
            }

            { hasStartedSpinning && hasFinishedSpinning &&
              <h2 className='px-0'>Result: <span> {data[prizeNumber].option} </span> </h2>
            }

          </div>
  
        </div>
      
      </div>
      </div>

    </>
  );
};
