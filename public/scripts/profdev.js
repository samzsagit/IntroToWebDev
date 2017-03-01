"use strict";

var app = angular.module('main', ['ngTable']).
controller('DemoCtrl', function($scope, ngTableParams, NameService) {

    var data = NameService.data;

    $scope.tableParams = new ngTableParams(
      {
        page: 1,            // show first page
        count: 10,           // count per page
        sorting: {name:'asc'}
      },
      {
        total: 0, // length of data
        getData: function($defer, params) {
          NameService.getData($defer,params,$scope.filter);
        }
    });
    
    $scope.$watch("filter.$", function () {
        $scope.tableParams.reload();
    });
    
});

app.service("NameService", function($http, $filter){
  
  function filterData(data, filter){
    return $filter('filter')(data, filter)
  }
  
  function orderData(data, params){
    return params.sorting() ? $filter('orderBy')(data, params.orderBy()) : filteredData;
  }
  
  function sliceData(data, params){
    return data.slice((params.page() - 1) * params.count(), params.page() * params.count())
  }
  
  function transformData(data,filter,params){
    return sliceData( orderData( filterData(data,filter), params ), params);
  }
  
  var service = {
    cachedData:[],
    getData:function($defer, params, filter){
      if(service.cachedData.length>0){
        console.log("using cached data")
        var filteredData = filterData(service.cachedData,filter);
        var transformedData = sliceData(orderData(filteredData,params),params);
        params.total(filteredData.length)
        $defer.resolve(transformedData);
      }
      else{
        console.log("fetching data")
        $http.get("/users").success(function(resp)
        {
          angular.copy(resp,service.cachedData)
          params.total(resp.length)
          var filteredData = $filter('filter')(resp, filter);
          var transformedData = transformData(resp,filter,params)
          
          $defer.resolve(transformedData);
        });  
      }
      
    }
  };
  return service;  
});


// var FixedDataTable = require('fixed-data-table');
// var React = require('react');

// const {Table, Column, Cell} = FixedDataTable;

// const DateCell = ({rowIndex, data, col, ...props}) => (
//   <Cell {...props}>
//     {data.getObjectAt(rowIndex)[col].toLocaleString()}
//   </Cell>
// );


// const LinkCell = ({rowIndex, data, col, ...props}) => (
//   <Cell {...props}>
//     <a href="#">{data.getObjectAt(rowIndex)[col]}</a>
//   </Cell>
// );

// const TextCell = ({rowIndex, data, col, ...props}) => (
//   <Cell {...props}>
//     {data.getObjectAt(rowIndex)[col]}
//   </Cell>
// );

// class ObjectDataExample extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       dataList: new FakeObjectDataListStore(1000000),
//     };
//   }

//   render() {
//     var {dataList} = this.state;
//     return (
//       <Table
//         rowHeight={50}
//         headerHeight={50}
//         rowsCount={dataList.getSize()}
//         width={1000}
//         height={500}
//         {...this.props}>
//         <Column
//           fixed={true}
//           width={50}
//         />
//         <Column
//           header={<Cell>First Name</Cell>}
//           cell={<LinkCell data={dataList} col="firstName" />}
//           fixed={true}
//           width={100}
//         />
//         <Column
//           header={<Cell>Last Name</Cell>}
//           cell={<TextCell data={dataList} col="lastName" />}
//           fixed={true}
//           width={100}
//         />
//         <Column
//           header={<Cell>City</Cell>}
//           cell={<TextCell data={dataList} col="city" />}
//           width={100}
//         />
//         <Column
//           header={<Cell>Street</Cell>}
//           cell={<TextCell data={dataList} col="street" />}
//           width={200}
//         />
//         <Column
//           header={<Cell>Zip Code</Cell>}
//           cell={<TextCell data={dataList} col="zipCode" />}
//           width={200}
//         />
//         <Column
//           header={<Cell>Email</Cell>}
//           cell={<LinkCell data={dataList} col="email" />}
//           width={200}
//         />
//         <Column
//           header={<Cell>DOB</Cell>}
//           cell={<DateCell data={dataList} col="date" />}
//           width={200}
//         />
//       </Table>
//     );
//   }
// }

// module.exports = ObjectDataExample;