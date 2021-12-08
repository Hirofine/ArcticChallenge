//pragma solidity ^0.5.16;
//pragma experimental ABIEncoderV2;
//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;
pragma abicoder v2;

contract CrudApp {
    
    struct S_standard{
        string unit;
        int value;
    }


    struct Temperature{
        S_standard temp;
        S_standard humidity;
        S_standard heatIndex;
        uint timestamp;
    }
    Temperature[] public weatherdb; 

   function setval(Temperature memory recTemperature) public{
       weatherdb.push(recTemperature);
   }

    function getval() public view returns(Temperature[] memory)
    {
        return weatherdb;
    }
}