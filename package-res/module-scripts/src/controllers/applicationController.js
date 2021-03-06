/*
 * Copyright 2002 - 2014 Webdetails, a Pentaho company.  All rights reserved.
 *
 * This software was developed by Webdetails and is provided under the terms
 * of the Mozilla Public License, Version 2.0, or any later version. You may not use
 * this file except in compliance with the license. If you need a copy of the license,
 * please go to  http://mozilla.org/MPL/2.0/. The Initial Developer is Webdetails.
 *
 * Software distributed under the Mozilla Public License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or  implied. Please refer to
 * the license for the specific language governing your rights and limitations.
 */

'use strict';

define(
    [
        'cd3e',
        'common-ui/underscore'
    ],

    function ( app, _ ) {
        console.log("Required controllers/applicationController.js");

        app.controller( 'applicationController',
            // dependencies
                        [ '$scope', 'Dashboard', 'componentElementFactory', 'layoutElementFactory', 'definitionsProvider', '$rootScope', 'importExportService', 'dashboardService',
            // controller
              function ( $scope, Dashboard, componentFactory, layoutFactory, definitionsProvider, $rootScope, $importExport, dashboardService) {

                // region controller methods
                function createDummyDashboard( depth, numChildren, probabilityOfComponent ) {
                    var dashboard = new Dashboard();
                    //return dashboard;
                    for( var i = 0; i < numChildren; i++ ) {
                        createDummyRow( depth - 1, numChildren, probabilityOfComponent )
                            .then ( function ( row ) {
                                dashboard.addRootElement( row );
                        });
                    }

                    return dashboard;
                }

                function createDummyRow( depth, numChildren, probabilityOfComponent ) {
                    return definitionsProvider.getLayoutDefinitions()
                        .then( function ( layoutDefinitions ) {
                            var rowDefinition = layoutDefinitions.LayoutRow;
                            var row = layoutFactory.create( rowDefinition );
                            console.log( "Row: " + depth );
                            if ( depth != 0 ) {
                                for( var i = 0; i < numChildren; i++ ) {
                                    createDummyColumn( depth - 1, numChildren, probabilityOfComponent )
                                        .then( function ( column )  {
                                            row.addChild( column );
                                    });
                                }
                            }
                            return row;
                        });
                }

                function createDummyColumn( depth, numChildren, probabilityOfComponent ) {
                    return definitionsProvider.getLayoutDefinitions()
                        .then( function ( layoutDefinitions ) {
                            var columnDefinition = layoutDefinitions.LayoutColumn;
                            var column = layoutFactory.create( columnDefinition );
                            console.log( "Column: " + depth );
                            var insertedComponent = insertComponent( column, probabilityOfComponent );
                            if ( depth != 0 && !insertedComponent ) {
                                for( var i = 0; i < numChildren; i++ ) {
                                    createDummyRow( depth - 1, numChildren, probabilityOfComponent )
                                        .then( function ( row )  {
                                            column.addChild( row );
                                        });
                                }
                            }
                            return column;
                        });
                }

                function createDummyComponent() {
                    return definitionsProvider.getComponentDefinitions()
                        .then( function ( componentDefinitions ) {
                            var definitionsArray = _.toArray( componentDefinitions );
                            var componentDefinition = definitionsArray[_.random( definitionsArray.length )];
                            return componentFactory.create( componentDefinition  );
                        });
                }

                function insertComponent( layoutElement, probabilityOfComponent ) {
                    if ( _.random( 100 ) <= probabilityOfComponent ) {
                        createDummyComponent().then( function ( component ) {
                            layoutElement.setComponent( component );
                        } );
                        return true;
                    }
                    return false;
                }

                function saveDashboard (){
                    $importExport.save( $scope.dashboard, $scope.filename);
                }

                // region controller methods
                $scope.$watch( 'selectedElement', function ( element ) {
                    if(!element) return;
                    console.log("AppController: Selected an element" + (element.getName ? element.getName(): ''));
                });
                // endregion

                // region scope bindings
                  //$scope.dashboard = createDummyDashboard( 4, 2, 30 );
                  $rootScope.dashboard = $scope.dashboard = dashboardService.create();
                  $scope.saveDashboard = saveDashboard;

                var x = {
                    getName: function() {
                        return "FakeElement";
                    },
                    getProperties: function(){
                        return [
                            {
                                _name: "Prop",
                                _value: 10,
                                getType: function() {
                                    return 'Type';
                                },
                                getName: function(){ return 'Prop';}
                            }
                        ];
                    }
                };
                //$scope.selectedElement = {};

                $scope.selectNoneElement = function () {
                    $rootScope.selectedElement = {};
                };
                  // endregion

                  // region controller init
                  $scope.filename = '/home/admin/cd3e_sample';
                // endregion
            }]
        );
    }
);
