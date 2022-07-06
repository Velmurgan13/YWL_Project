import React, { useState, useEffect } from "react";
import "./checkavailibity.scss";
// import { HiOutlineTrash } from "react-icons/hi";
import { TiMinus, TiPlus } from "react-icons/ti";
const Counter = ({
  counterData,
  counterIndex,
  adultsRef,
  childsRef,
  roomsDetails,
  setChildAgeValues,
  updateTotalValues,
  inputParams,
}) => {
// delete this line 
  const initialStateCounter = {
    adultCounter: counterData.adult,
    childrenCounter: counterData.children,
  };
  const [{ adultCounter, childrenCounter }, setCounter] =
    useState(initialStateCounter);

  const [counterbtnDisabledMinus, setCounterBtnDisabled] = useState(false);
  const [counterbtnDisabledPlus, setCounterBtnDisabledPlus] = useState(false);
  const [counterbtnChildDisabledMinus, setCounterBtnChildDisabled] = useState(false);
  const [counterbtnChildDisabledPlus, setCounterBtnChildDisabledPlus] = useState(false);
  const [children, setChildren] = useState([]);

  function setChildrenAges(inputParams) {
    if (inputParams) {

      for (let j = 0; j < parseInt(counterData.children); j++) {
        if(children.length < counterData.children){
          setChildren((array) => [...array, { j }]);
        }          
  
          setTimeout(() => {
            let ageIndex = 0;
            if (counterIndex == 0) {
              ageIndex = 0;
            } else if (counterIndex == 1) {
              ageIndex = 4;
            } else if (counterIndex == 2) {
              ageIndex = 8;
            } else if (counterIndex == 3) {
              ageIndex = 12;
            } else if (counterIndex == 4) {
              ageIndex = 14;
            } else if (counterIndex == 5) {
              ageIndex = 18;
            } else if (counterIndex == 6) {
              ageIndex = 22;
            } else if (counterIndex == 7) {
              ageIndex = 26;
            }
  
            for (let i = 0; i < 4; i++) {
              if (document.getElementById(ageIndex + i)) {
                document.getElementById(ageIndex + i).value = inputParams.child[ageIndex + i];
              }
            }
          }, 1000);
      }
    }
  }

  useEffect(() => {    
    setChildrenAges(inputParams);
  }, [inputParams]);

  const handlerCounter = (key, sign) => {
    if ((sign === "minus" && adultCounter === 0 && key === "adultCounter") ||
      (sign === "minus" && childrenCounter === 0 && key === "childrenCounter")) {
      return;
    } else if (
      (adultCounter === 5 && key === "adultCounter" && sign === "plus") ||
      (childrenCounter === 4 && key === "childrenCounter" && sign === "plus")
    ) {
      if (key === "adultCounter") {
        // disable adult +(plus) button when adult count = 5
        setCounterBtnDisabledPlus(true);
      } else {
        // disable children +(plus) button when children count = 4
        setCounterBtnChildDisabledPlus(true);
      }
      return;
    } else if ( sign === "minus" && adultCounter === 5 && key === "adultCounter" ) {
      // enable Adult +(plus) button when adult count < 5
      setCounterBtnDisabledPlus(false);
    } else if ( sign === "minus" && adultCounter === 2 && key === "adultCounter" ) {
      // disable Adult -(minus) button when adult count = 1
      setCounterBtnDisabled(true);
    } else if ( sign === "minus" && childrenCounter === 4 && key === "childrenCounter" ) {
      // enable Children +(plus) button when children count was 4 and then reduced to 3
      setCounterBtnChildDisabledPlus(false);
    } else if ( sign === "minus" && childrenCounter === 1 && key === "childrenCounter" ) {
      // disable Children -(minus) button when children count = 1
      setCounterBtnChildDisabled(true);
    } else if ( sign === "plus" && adultCounter === 1 && key === "adultCounter" ) {
      // enable Adult -(minus) button when adult count = 1
      setCounterBtnDisabled(false);
    } else if ( sign === "plus" && childrenCounter === 0 && key === "childrenCounter" ) {
      // enable Children -(minus) button when children count >= 2
      setCounterBtnChildDisabled(false);
    }

    setCounter((prevCounter) => ({
      ...prevCounter,
      [key]: sign == "plus" ? prevCounter[key] + 1 : prevCounter[key] - 1,
    }));

    if (key === "childrenCounter" && childrenCounter <= 4 && sign === "plus") {
      setChildren((prevArray) => [...prevArray, childrenCounter]);

      // add children age to the array as the value is updated only after the element's value is changed
      // childsAgeValues.push({name:'childage_'+counterIndex+'_'+childrenCounter, value:'1' })
      // setChildAgeValues([{name:'childage_'+counterIndex+'_'+childrenCounter, value:'1' }])
      setChildAgeValues((oldArray) => [
        ...oldArray,
        {
          name: "childage_" + counterIndex + "_" + childrenCounter,
          value: "1",
        },
      ]);
      // setChildrenAgeId()
    } else if ( key === "childrenCounter" && childrenCounter <= 4 && sign === "minus" ) {
      children.pop();

      setChildren((prevArray) => [...prevArray]);
    }

    setTimeout(()=>{
      updateTotalValues()
    }, 100)
    
  }

  function handleChange(i, roomsDetails) {
    adultsRef.current[i + 1].focus();
  }

  function handleChangeTwo(i) {
    childsRef.current[i + 1].focus();
  }

  function handleChangeThree(e) {
    setChildAgeValues((oldArray) => [
      ...oldArray,
      { name: e.target.name, value: e.target.value },
    ]);
  }

  return (
    <div className="mainCheckAvail">
      <div className="RoomDiv col-xl-12 P0">
        <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3 roomName counter-heading">
          Room {counterIndex + 1}
        </div>

        <div className="col-xl-4 col-lg-4 col-md-4 col-xs-4 adultDiv">
          <button
            type="button"
            className="minusBtn"
            onClick={() => handlerCounter("adultCounter", "minus")}
            disabled={counterbtnDisabledMinus}
          >
            <TiMinus size="20" className="" />
          </button>

          <input
            type="text"
            className="adultsValue counter-value"
            name={"adults" + counterIndex}
            id={"adults" + counterIndex}
            readOnly="readonly"
            value={adultCounter}
            ref={(ref) => adultsRef.current.push(ref)}
            onChange={() => handleChange(counterIndex, roomsDetails)}
          />

          <button
            type="button"
            className="plusBtn"
            onClick={() => handlerCounter("adultCounter", "plus")}
            disabled={counterbtnDisabledPlus}
          >
            <TiPlus size="20" className="" />
          </button>
        </div>

        <div className="col-xl-4 col-lg-4 col-md-4 col-xs-4 childDiv">
          <button
            type="button"
            className="minusBtn"
            onClick={() => handlerCounter("childrenCounter", "minus")}
            disabled={counterbtnChildDisabledMinus}
          >
            <TiMinus size="20" className="" />
          </button>

          <input
            type="text"
            className="childsValue counter-value"
            name={"child" + counterIndex}
            id={"child" + counterIndex}
            readOnly="readonly"
            value={childrenCounter}
            ref={(ref) => childsRef.current.push(ref)}
            onChange={() => handleChangeTwo(counterIndex)}
          />

          <button
            type="button"
            className="plusBtn"
            onClick={() => handlerCounter("childrenCounter", "plus")}
            disabled={counterbtnChildDisabledPlus}
          >
            <TiPlus size="20" className="" />
          </button>
        </div>

        <div className="col-xl-1 col-lg-1 col-md-1 col-xs-1 deleteBtn"></div>
      </div>

      <div className="noOfChild pt-3">
        {children.length > 0 &&
          children.map((data, index) => (
            <div className="age-col" key={index}>
              <p>Age</p>
              <select
                className="px-3"
                name={"childage_" + counterIndex + "_" + index}
                multiple={false}
                onChange={handleChangeThree}
                id={4 * counterIndex + index}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
            </div>
          ))}
      </div>
    </div>
  );
};

export default function AdultsChid({
  adultsRef,
  childsRef,
  /*childsAgeRef,*/ roomsCountRef,
  setChildAgeValues,
  updateTotalValues,
  inputParams,
}) {
  // console.log(inputParams)

  const initialState = [];
  if (!inputParams) {
    initialState[0] = {
      adult: 2,
      children: 0,
    };
  }

  const [roomsDetails, setRoomDetails] = useState(initialState);
  const [disabled, setDisbaled] = useState(true);
  const [disabledAdd, setDisbaledAdd] = useState(false);

  const handlerAddRoom = () => {
    var objects = { adult: 2, children: 0 };
    setRoomDetails((array) => [...array, objects]);
    setDisbaled(false);
    if (roomsDetails.length === 5) {
      window.open('/six-plus-booking', '_self');
    } else {
      setDisbaledAdd(false);
    }

    setTimeout(() => {
      updateTotalValues();
    }, 100);
  };

  /*function removeDuplicates(obj){
    if(obj.current){
      let temp = obj.current.reduce(function(previous, current) {
        if(current != null && previous != undefined){
          var object = previous.filter(object => object.name === current.name);
          if (object.length == 0) {
            previous.push(current);
          }
        }
        return previous;
      }, []);
      return temp;
    }
  }*/

  const handlerDeleteRoom = () => {
    if (roomsDetails.length == 1 && !inputParams) {
      setDisbaled(true);
      return;
    }
    roomsDetails.pop();
    setRoomDetails((array) => [...array]);
    if (roomsDetails.length > 4) {
      setDisbaledAdd(true);
    } else {
      setDisbaledAdd(false);
    }

    setTimeout(() => {
      updateTotalValues();
    }, 100);

    /*if(adultsRef){
        if(adultsRef.current){  
          // remove duplicate values from the object
          adultsRef = removeDuplicates(adultsRef)

          adultsRef.current = Object.values(adultsRef).map((data) => {
                                for(let r=0; r<roomsDetails.length; r++){
                                  if(data.name === 'adults'+r){
                                    return data
                                  }
                                }
                              })
        }
    }
    */
  };

  function setRoomsvalues(inputParams) {
    if (inputParams) {
      setRoomDetails([]); // empty "roomsDetails" so that new rooms with inputParams data can be shown
      handlerDeleteRoom();

      if (parseInt(inputParams.no_of_rooms) > 0) {
        for (let a = 0; a < parseInt(inputParams.no_of_rooms); a++) {
          setRoomDetails((array) => [
            ...array,
            { adult: inputParams.adults[a], children: inputParams.children[a] },
          ]);
        }
      }
    }
  }

  useEffect(() => {
    setRoomsvalues(inputParams);
  }, []);

  useEffect(() => {
    if (roomsDetails.length == 1) {
      setDisbaled(true);
    } else {
      setDisbaled(false);
    }
  }, [roomsDetails]);

  return (
    <div className="mainCheckAvail">
      <div className="detailsBox">
        <div className="detailsTitle">
          <div className="col-lg-3 col-md-3 col-sm-4 col-xs-3 dummyDiv"></div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center text-strong F16 px-0 adultTitle">
            <div className="top_room_heading">Adults</div>
            <div className="infos">Ages 13 and older</div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 text-center text-strong F16 px-0 childTitle">
            <div className="top_room_heading">Children</div>
            <div className="infos">Ages 12 and younger</div>
          </div>
          <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1 dummyDiv dummyDiv1"></div>
        </div>
        <div className="container text-center px-0">
          {roomsDetails.map((data, index) => (
            <div className="col px-0 roomDetailInfo" key={index}>
              <Counter
                counterData={data}
                counterIndex={index}
                adultsRef={adultsRef}
                childsRef={childsRef}
                /*childsAgeRef={childsAgeRef}*/ roomsDetails={roomsDetails}
                setChildAgeValues={setChildAgeValues}
                updateTotalValues={updateTotalValues}
                inputParams={inputParams}
              />
            </div>
          ))}

          <div className="col-12 addDeleteBtnDiv">
            <button
              className="btn-common succes-button margin-right-10 del-btn"
              onClick={() => handlerDeleteRoom()}
              disabled={disabled}
              type="button"
            >
              Delete Rooms
            </button>
            <button
              className="btn-common succes-button"
              onClick={() => handlerAddRoom()}
              disabled={disabledAdd}
              type="button"
            >
              Add Additional Room
            </button>
          </div>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 black text-left clildboxpolicy MB20SM MT10 MB10 F11 pt-3">
          <p className="MB0 xssmcolor text-left">
            * Children above 12 years of age are considered an adult.
          </p>
          <p className="MB0 xssmcolor text-left">* Age at time of travel.</p>
        </div>
        <input
          type="hidden"
          value={roomsDetails.length}
          name="roomsCount"
          ref={roomsCountRef}
          id="no_of_rooms"
        />
      </div>
    </div>
  );
}