export const defalutMaterials = [
    {
      name: '基本形状',
      expand: true,
      show: true,
      list: [
        {
          name: 'square',
          icon: 't-icon t-rect',
          id: 1,
          data: {
            text: '正方形',
            rect: {
              width: 200,
              height: 200
            },
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            name: 'square',
            icon: '\ue64d',
            iconFamily: 'topology',
            iconColor: '#2f54eb'
          }
        },
        {
          name: 'image',
          icon: 't-icon t-rect',
          id: 56546,
          data: {
            text: 'image',
            name: 'image',
            image:
            "http://iot.cloudta.cn:30001/bladex/upload/20220602/c8daafcaf9cda133dff504bdc8ecb242.png",
          }
        },
        {
          name: 'rectangle',
          icon: 't-icon t-rectangle',
          id: 2,
          data: {
            text: '圆角矩形',
            rect: {
              width: 200,
              height: 50
            },
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 0.1,
            name: 'rectangle'
          }
        },
        {
          name: 'circle',
          icon: 't-icon t-circle',
          id: 3,
          data: {
            text: '圆',
            rect: {
              width: 100,
              height: 100
            },
            name: 'circle',
            textMaxLine: 1
          }
        },
        {
          name: 'triangle',
          icon: 't-icon t-triangle',
          id: 4,
          data: {
            text: '三角形',
            rect: {
              width: 100,
              height: 100
            },
            name: 'triangle'
          }
        },
        {
          name: 'diamond',
          icon: 't-icon t-diamond',
          id: 5,
          data: {
            text: '菱形',
            rect: {
              width: 100,
              height: 100
            },
            name: 'diamond'
          }
        },
        {
          name: 'pentagon',
          icon: 't-icon t-pentagon',
          id: 6,
          data: {
            text: '五边形',
            rect: {
              width: 100,
              height: 100
            },
            name: 'pentagon'
          }
        },
        {
          name: 'hexagon',
          icon: 't-icon t-hexagon',
          id: 7,
          data: {
            text: '六边形',
            rect: {
              width: 100,
              height: 100
            },
            paddingTop: 10,
            paddingBottom: 10,
            name: 'hexagon'
          }
        },
        {
          name: 'pentagram',
          icon: 't-icon t-pentagram',
          id: 8,
          data: {
            text: '五角星',
            rect: {
              width: 100,
              height: 100
            },
            name: 'pentagram'
          }
        },
        {
          name: 'leftArrow',
          icon: 't-icon t-arrow-left',
          id: 9,
          data: {
            text: '左箭头',
            rect: {
              width: 200,
              height: 100
            },
            name: 'leftArrow'
          }
        },
        {
          name: 'rightArrow',
          icon: 't-icon t-arrow-right',
          id: 10,
          data: {
            text: '右箭头',
            rect: {
              width: 200,
              height: 100
            },
            name: 'rightArrow'
          }
        },
        {
          name: 'twowayArrow',
          icon: 't-icon t-twoway-arrow',
          id: 11,
          data: {
            text: '双向箭头',
            rect: {
              width: 200,
              height: 100
            },
            name: 'twowayArrow'
          }
        },
        {
          name: 'line',
          icon: 't-icon t-line',
          id: 12,
          data: {
            text: '直线',
            rect: {
              width: 100,
              height: 100
            },
            name: 'line'
          }
        },
        {
          name: 'cloud',
          icon: 't-icon t-cloud',
          id: 13,
          data: {
            text: '云',
            rect: {
              width: 100,
              height: 100
            },
            name: 'cloud'
          }
        },
        {
          name: 'message',
          icon: 't-icon t-msg',
          id: 14,
          data: {
            text: '消息框',
            rect: {
              width: 100,
              height: 100
            },
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            name: 'message'
          }
        },
        {
          name: 'file',
          icon: 't-icon t-file',
          id: 15,
          data: {
            text: '文档',
            rect: {
              width: 80,
              height: 100
            },
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            name: 'file'
          }
        },
        {
          name: 'text',
          icon: 't-icon t-text',
          id: 16,
          data: {
            text: 'le5le-topology / 乐吾乐',
            rect: {
              width: 160,
              height: 30
            },
            name: 'text'
          }
        },
        {
          name: 'image',
          icon: 't-icon t-image',
          id: 17,
          data: {
            text: '',
            rect: {
              width: 100,
              height: 100
            },
            name: 'image',
            image: '/assets/img/logo.png'
          }
        },
        {
          name: 'cube',
          icon: 't-icon t-cube',
          id: 18,
          data: {
            text: '立方体',
            rect: {
              width: 50,
              height: 70
            },
            is3D: true,
            z: 10,
            zRotate: 15,
            fillStyle: '#ddd',
            name: 'cube',
            icon: '\ue63c',
            iconFamily: 'topology',
            iconColor: '#777',
            iconSize: 30
          }
        },
        {
          name: 'people',
          icon: 't-icon t-people',
          id: 19,
          data: {
            text: '用户',
            rect: {
              width: 70,
              height: 100
            },
            name: 'people'
          }
        },
        {
          name: '视频/网页',
          icon: 't-icon t-pc',
          id: 20,
          data: {
            text: '视频/网页',
            rect: {
              width: 200,
              height: 200
            },
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            // strokeStyle: 'transparent',
            name: 'div'
          }
        },
        {
          name: '涂鸦',
          icon: 't-icon t-pencil',
          class: '架构拓扑图',
          data: {
            name: 'graffiti',
            type: 0, //  0- 连线； 1- 节点
            doing: true,
            rect: {
              width: 100,
              height: 100
            }
          }
        },
        {
          name: '涂鸦2',
          icon: 't-icon t-pencil-close',
          class: '架构拓扑图',
          data: {
            name: 'graffiti',
            type: 0, //  0- 连线； 1- 节点
            closePath: true, // 是否闭合
            doing: true,
            rect: {
              width: 0,
              height: 0
            }
          }
        },
        {
          name: '钢笔',
          icon: 't-icon t-pen',
          class: '架构拓扑图',
          data: {
            name: 'lines',
            type: 1, //  1- 连线
            doing: true,
            rect: {
              width: 0,
              height: 0
            }
          }
        },
        {
          name: '钢笔节点',
          icon: 't-icon t-dakai',
          class: '架构拓扑图',
          data: {
            isNode: true,
            name: 'lines',
            type: 0, //  0- 节点
            doing: true,
  
            rect: {
              width: 0,
              height: 0
            }
          }
        },
        {
          name: '钢笔闭合节点',
          icon: 't-icon t-quanfengbi',
          class: '架构拓扑图',
          data: {
            name: 'lines',
            type: 0, //  0- 节点
            doing: true,
            closePath: true, // 是否闭合
            rect: {
              width: 0,
              height: 0
            }
          }
        }
      ]
    },
    {
      name: '流程图',
      expand: true,
      show: true,
      list: [
        {
          name: '开始/结束',
          icon: 't-icon t-flow-start',
          id: 21,
          data: {
            text: '开始/结束',
            rect: {
              width: 120,
              height: 40
            },
            borderRadius: 0.5,
            name: 'rectangle'
          }
        },
        {
          name: '流程',
          icon: 't-icon t-rectangle',
          id: 22,
          data: {
            text: '流程',
            rect: {
              width: 120,
              height: 40
            },
            name: 'rectangle'
          }
        },
        {
          name: '判定',
          icon: 't-icon t-diamond',
          id: 23,
          data: {
            text: '判定',
            rect: {
              width: 120,
              height: 60
            },
            name: 'diamond'
          }
        },
        {
          name: '数据',
          icon: 't-icon t-flow-data',
          id: 24,
          data: {
            text: '数据',
            rect: {
              width: 120,
              height: 50
            },
            name: 'flowData'
          }
        },
        {
          name: '准备',
          icon: 't-icon t-flow-ready',
          id: 25,
          data: {
            text: '准备',
            rect: {
              width: 120,
              height: 50
            },
            name: 'hexagon'
          }
        },
        {
          name: '子流程',
          icon: 't-icon t-flow-subprocess',
          id: 26,
          data: {
            text: '子流程',
            rect: {
              width: 120,
              height: 50
            },
            name: 'flowSubprocess'
          }
        },
        {
          name: '数据库',
          icon: 't-icon t-db',
          id: 27,
          data: {
            text: '数据库',
            rect: {
              width: 80,
              height: 120
            },
            name: 'flowDb'
          }
        },
        {
          name: '文档',
          icon: 't-icon t-flow-document',
          id: 28,
          data: {
            text: '文档',
            rect: {
              width: 120,
              height: 100
            },
            name: 'flowDocument'
          }
        },
        {
          name: '内部存储',
          icon: 't-icon t-internal-storage',
          id: 29,
          data: {
            text: '内部存储',
            rect: {
              width: 120,
              height: 80
            },
            name: 'flowInternalStorage'
          }
        },
        {
          name: '外部存储',
          icon: 't-icon t-extern-storage',
          id: 30,
          data: {
            text: '外部存储',
            rect: {
              width: 120,
              height: 80
            },
            name: 'flowExternStorage'
          }
        },
        {
          name: '队列',
          icon: 't-icon t-flow-queue',
          id: 31,
          data: {
            text: '队列',
            rect: {
              width: 100,
              height: 100
            },
            name: 'flowQueue'
          }
        },
        {
          name: '手动输入',
          icon: 't-icon t-flow-manually',
          id: 32,
          data: {
            text: '手动输入',
            rect: {
              width: 120,
              height: 80
            },
            name: 'flowManually'
          }
        },
        {
          name: '展示',
          icon: 't-icon t-flow-display',
          id: 33,
          data: {
            text: '展示',
            rect: {
              width: 120,
              height: 80
            },
            name: 'flowDisplay'
          }
        },
        {
          name: '并行模式',
          icon: 't-icon t-flow-parallel',
          id: 34,
          data: {
            text: '并行模式',
            rect: {
              width: 120,
              height: 50
            },
            name: 'flowParallel'
          }
        },
        {
          name: '注释',
          icon: 't-icon t-flow-comment',
          id: 35,
          data: {
            text: '注释',
            rect: {
              width: 100,
              height: 100
            },
            name: 'flowComment'
          }
        }
      ]
    },
    {
      name: '活动图',
      expand: true,
      show: true,
      list: [
        {
          name: '开始',
          icon: 't-icon t-inital',
          id: 36,
          data: {
            text: '',
            rect: {
              width: 50,
              height: 50
            },
            name: 'circle',
            background: '#555',
            strokeStyle: 'transparent'
          }
        },
        {
          name: '结束',
          icon: 't-icon t-final',
          id: 37,
          data: {
            text: '结束',
            rect: {
              width: 50,
              height: 50
            },
            name: 'activityFinal'
          }
        },
        {
          name: '活动',
          icon: 't-icon t-action',
          id: 38,
          data: {
            text: '活动',
            rect: {
              width: 120,
              height: 50
            },
            borderRadius: 0.25,
            name: 'rectangle'
          }
        },
        {
          name: '决策/合并',
          icon: 't-icon t-diamond',
          id: 39,
          data: {
            text: '决策/合并',
            rect: {
              width: 120,
              height: 50
            },
            name: 'diamond'
          }
        },
        {
          name: '垂直泳道',
          icon: 't-icon t-swimlane-v',
          id: 40,
          data: {
            text: '垂直泳道',
            rect: {
              width: 200,
              height: 500
            },
            name: 'swimlaneV'
          }
        },
        {
          name: '水平泳道',
          icon: 't-icon t-swimlane-h',
          id: 41,
          data: {
            text: '水平泳道',
            rect: {
              width: 500,
              height: 200
            },
            name: 'swimlaneH'
          }
        },
        {
          name: '垂直分岔/汇合',
          icon: 't-icon t-fork-v',
          id: 42,
          data: {
            text: '垂直分岔/汇合',
            rect: {
              width: 10,
              height: 150
            },
            name: 'forkV',
            fillStyle: '#555',
            strokeStyle: 'transparent'
          }
        },
        {
          name: '水平分岔/汇合',
          icon: 't-icon t-fork',
          id: 43,
          data: {
            text: '水平分岔/汇合',
            rect: {
              width: 150,
              height: 10
            },
            name: 'forkH',
            fillStyle: '#555',
            strokeStyle: 'transparent'
          }
        }
      ]
    },
    {
      name: '时序图和类图',
      expand: true,
      show: true,
      list: [
        {
          name: '生命线',
          icon: 't-icon t-lifeline',
          id: 44,
          data: {
            text: '生命线',
            rect: {
              width: 150,
              height: 400
            },
            name: 'lifeline'
          }
        },
        {
          name: '激活',
          icon: 't-icon t-focus',
          id: 45,
          data: {
            text: '激活',
            rect: {
              width: 12,
              height: 200
            },
            name: 'sequenceFocus'
          }
        },
        {
          name: '简单类',
          icon: 't-icon t-simple-class',
          id: 46,
          data: {
            text: 'Topolgoy',
            rect: {
              width: 270,
              height: 200
            },
            paddingTop: 40,
            font: {
              fontFamily: 'Arial',
              color: '#222222',
              fontWeight: 'bold'
            },
            fillStyle: '#ffffba',
            strokeStyle: '#7e1212',
            name: 'simpleClass',
            list: [
              {
                text: '- name: string\n+ setName(name: string): void',
                name: 'text',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 10,
                rectInParent: {
                  x: 0,
                  y: 0,
                  width: '100%',
                  height: '100%',
                  rotate: 0
                },
                font: {
                  fontFamily: 'Arial',
                  color: '#222222',
                  textAlign: 'left',
                  textBaseline: 'top'
                }
              }
            ]
          }
        },
        {
          name: '类',
          icon: 't-icon t-class',
          id: 47,
          data: {
            text: 'Topolgoy',
            rect: {
              width: 270,
              height: 200
            },
            paddingTop: 40,
            font: {
              fontFamily: 'Arial',
              color: '#222222',
              fontWeight: 'bold'
            },
            fillStyle: '#ffffba',
            strokeStyle: '#7e1212',
            name: 'interfaceClass',
            list: [
              {
                text: '- name: string',
                name: 'text',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 10,
                rectInParent: {
                  x: 0,
                  y: 0,
                  width: '100%',
                  height: '50%',
                  rotate: 0
                },
                font: {
                  fontFamily: 'Arial',
                  color: '#222222',
                  textAlign: 'left',
                  textBaseline: 'top'
                }
              },
              {
                text: '+ setName(name: string): void',
                name: 'text',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
                paddingBottom: 10,
                rectInParent: {
                  x: 0,
                  y: '50%',
                  width: '100%',
                  height: '50%',
                  rotate: 0
                },
                font: {
                  fontFamily: 'Arial',
                  color: '#222222',
                  textAlign: 'left',
                  textBaseline: 'top'
                }
              }
            ]
          }
        }
      ]
    },
    {
      name: '图表控件（echarts）',
      expand: true,
      show: true,
      list: [
        {
          name: '折线图',
          icon: 't-icon t-line-chart',
          id: 48,
          data: {
            text: '折线图',
            rect: {
              width: 300,
              height: 200
            },
            name: 'echarts',
            data: {
              echarts: {
                option: {
                  xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [
                    {
                      data: [820, 932, 901, 934, 1290, 1330, 1320],
                      type: 'line'
                    }
                  ]
                }
              }
            }
          }
        },
        {
          name: '柱状图',
          icon: 't-icon t-bar-chart',
          id: 49,
          data: {
            text: '柱状图',
            rect: {
              width: 300,
              height: 200
            },
            name: 'echarts',
            data: {
              echarts: {
                option: {
                  color: ['#3398DB'],
                  tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                      // 坐标轴指示器，坐标轴触发有效
                      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                  },
                  grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                  },
                  xAxis: [
                    {
                      type: 'category',
                      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                      axisTick: {
                        alignWithLabel: true
                      }
                    }
                  ],
                  yAxis: [
                    {
                      type: 'value'
                    }
                  ],
                  series: [
                    {
                      name: '直接访问',
                      type: 'bar',
                      barWidth: '60%',
                      data: [10, 52, 200, 334, 390, 330, 220]
                    }
                  ]
                }
              }
            }
          }
        },
        {
          name: '饼图',
          icon: 't-icon t-pie-chart',
          id: 50,
          data: {
            text: '饼图',
            rect: {
              width: 200,
              height: 200
            },
            name: 'echarts',
            data: {
              echarts: {
                option: {
                  tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                  },
                  legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: [
                      '直接访问',
                      '邮件营销',
                      '联盟广告',
                      '视频广告',
                      '搜索引擎'
                    ]
                  },
                  series: [
                    {
                      name: '访问来源',
                      type: 'pie',
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                        normal: {
                          show: false,
                          position: 'center'
                        },
                        emphasis: {
                          show: true,
                          textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                          }
                        }
                      },
                      labelLine: {
                        normal: {
                          show: false
                        }
                      },
                      data: [
                        { value: 335, name: '直接访问' },
                        { value: 310, name: '邮件营销' },
                        { value: 234, name: '联盟广告' },
                        { value: 135, name: '视频广告' },
                        { value: 1548, name: '搜索引擎' }
                      ]
                    }
                  ]
                }
              }
            }
          }
        },
        {
          name: '仪表盘',
          icon: 't-icon t-dashboard-chart',
          id: 51,
          data: {
            text: '仪表盘',
            rect: {
              width: 300,
              height: 300
            },
            name: 'echarts',
            data: {
              echarts: {
                option: {
                  tooltip: {
                    formatter: '{a} <br/>{b} : {c}%'
                  },
                  toolbox: {
                    feature: {
                      restore: {},
                      saveAsImage: {}
                    }
                  },
                  series: [
                    {
                      name: '业务指标',
                      type: 'gauge',
                      detail: { formatter: '{value}%' },
                      data: [{ value: 50, name: '完成率' }]
                    }
                  ]
                }
              }
            }
          }
        }
      ]
    }
  ];