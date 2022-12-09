import {Topology} from "@topology/core";
//自定义动画
// Topology.prototype.customAnimateStart = function (pen) {
//   pen.copyPen = deepClone(pen)
//   pen.customAnimateStart = true
//   this.customAnimate(pen)
// };
// Topology.prototype.customAnimateStop = function (pen) {
//   pen.customAnimateStart = false
//   console.log(pen,"stop")
// };
// Topology.prototype.customAnimatePause = function (pen) {
//   if(!pen.pause){
//     pen.pause = true
//     return
//   }
//   pen.pause = !pen.pause
// };
// Topology.prototype.customAnimate = function (pen) {
//   if(!pen.customAnimateStart){
//     this.setValue(pen.copyPen)
//     return
//   }
//   if(pen.pause){
//     pen.pausePen = deepClone(pen)
//     return
//   }
//   var __values =
//     (this && this.__values) ||
//     function (o) {
//       var s = typeof Symbol === "function" && Symbol.iterator,
//         m = s && o[s],
//         i = 0;
//       if (m) return m.call(o);
//       if (o && typeof o.length === "number")
//         return {
//           next: function () {
//             if (o && i >= o.length) o = void 0;
//             return { value: o && o[i++], done: !o };
//           },
//         };
//       throw new TypeError(
//         s ? "Object is not iterable." : "Symbol.iterator is not defined."
//       );
//     };
//   var now = Date.now();
//   function initPrevFrame(pen) {
//     pen.prevFrame = {};
//     for (var k in pen) {
//       if (typeof pen[k] !== "object" || k === "lineDash") {
//         pen.prevFrame[k] = pen[k];
//       }
//     }
//     pen.prevFrame.rotate = 0;
//     pen.prevFrame.x = 0;
//     pen.prevFrame.y = 0;
//     pen.prevFrame.scale = 1;
//   }
//   function setNodeAnimate(pen, now) {
//     var e_4, _a, e_5, _b;
//     if (pen.calculative.start === 0 || !pen.frames || !pen.frames.length) {
//       pen.calculative.start = undefined;
//       return 0;
//     }
//     if (!pen.calculative.duration) {
//       pen.calculative.duration = 0;
//       try {
//         for (
//           var _c = __values(pen.frames), _d = _c.next();
//           !_d.done;
//           _d = _c.next()
//         ) {
//           var f = _d.value;
//           pen.calculative.duration += f.duration;
//           for (var k in f) {
//             if (k !== "duration" && !pen[k]) {
//               if (k === "scale") {
//                 pen[k] = 1;
//               }
//             }
//           }
//         }
//       } catch (e_4_1) {
//         e_4 = { error: e_4_1 };
//       } finally {
//         try {
//           if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
//         } finally {
//           if (e_4) throw e_4.error;
//         }
//       }
//     }
//     if (!pen.animateCycle) {
//       pen.animateCycle = Infinity;
//     }
//     if (!pen.calculative.start) {
//       pen.calculative.start = now;
//       pen.calculative.frameIndex = 0;
//       pen.calculative.frameStart = pen.calculative.start;
//       pen.calculative.frameDuration = pen.frames[0].duration;
//       pen.calculative.frameEnd =
//       pen.calculative.frameStart + pen.calculative.frameDuration;
//       pen.calculative.cycleIndex = 1;
//       pen.calculative.x = pen.calculative.worldRect.x;
//       pen.calculative.y = pen.calculative.worldRect.y;
//       pen.calculative.initRect = deepClone(pen.calculative.worldRect);
//       pen.calculative.initRect.rotate = pen.calculative.rotate || 0;
//       initPrevFrame(pen);
//     } else {
//       var frameIndex = 0;
//       var cycleIndex = Math.ceil(
//         (now - pen.calculative.start) / pen.calculative.duration
//       );
//       // 播放结束
//       if (cycleIndex > pen.animateCycle) {
//         pen.calculative.start = undefined;
//         setNodeAnimateProcess(pen, 1);
//         return 0;
//       }
//       var pos = (now - pen.calculative.start) % pen.calculative.duration;
//       var d = 0;
//       try {
//         for (
//           var _e = __values(pen.frames), _f = _e.next();
//           !_f.done;
//           _f = _e.next()
//         ) {
//           var frame = _f.value;
//           d += frame.duration;
//           if (pos > d) {
//             ++frameIndex;
//           } else {
//             break;
//           }
//         }
//       } catch (e_5_1) {
//         e_5 = { error: e_5_1 };
//       } finally {
//         try {
//           if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
//         } finally {
//           if (e_5) throw e_5.error;
//         }
//       }
//       // 帧超出
//       if (!pen.frames[frameIndex]) {
//         return true;
//       }
//       pen.calculative.frameDuration = pen.frames[frameIndex].duration;
//       pen.calculative.frameStart =
//         pen.calculative.start + pen.calculative.duration * (cycleIndex - 1);
//       pen.calculative.frameEnd =
//         pen.calculative.frameStart + pen.calculative.frameDuration;
//       // 换帧
//       var frameChanged = frameIndex !== pen.calculative.frameIndex;
//       // 新循环播放

//       var cycleChanged = cycleIndex > pen.calculative.cycleIndex;
//       frameChanged && (pen.calculative.frameIndex = frameIndex);
//       cycleChanged && (pen.calculative.cycleIndex = cycleIndex);
//       if (frameChanged || cycleChanged) {
//         // 以初始位置为参考点。因为网页在后台时，不执行动画帧，网页恢复显示时，位置不确定
//         for(let key in pen.copyPen[key]){
//                 for(let keys in pen){
//                     if(key == keys){
//                         pen[keys] = pen.copyPen[key]
//                     }
//                 }
//         }
//       }
//     }
//     var process =
//       ((now - pen.calculative.frameStart) / pen.calculative.frameDuration) % 1;
//     setNodeAnimateProcess(pen, process);
//     return true;
//   }
//   function setNodeAnimateProcess(pen, process) {
//     var _a;
//     if (process < 0) {
//         return;
//     }
//     if (process > 1) {
//         process = 1;
//     }
//     var frame = pen.frames[pen.calculative.frameIndex];
//     for (var k in frame) {
//         if (k === 'duration') {
//             continue;
//         }
//         else if (k === 'x'|| k === 'y') {
//             var current = pen.prevFrame[k] + (frame[k] - pen.prevFrame[k]) * process;
//             //pen.calculative[k] = Math.round(current * 100) / 100;
//             var v = {id:pen.id};
//             v[k] = Math.round(current * 100) / 100 + pen.copyPen[k];
//             _this.setValue(v);
//         }
//         else if (isLinear(frame[k], k, pen)) {
//             if (pen.prevFrame[k] == null) {
//                 if (k === 'globalAlpha') {
//                     pen.prevFrame[k] = 1;
//                 }
//                 else {
//                     pen.prevFrame[k] = 0;
//                 }
//             }
//             var current = pen.prevFrame[k] + (frame[k] - pen.prevFrame[k]) * process;
//             //pen.calculative[k] = Math.round(current * 100) / 100;
//             var v = {id:pen.id};
//             v[k] = Math.round(current * 100) / 100;
//             _this.setValue(v);
//         }
//         else {
//             var v = {id:pen.id};
//             v[k] = frame[k];
//             _this.setValue(v);
//         }
//         if (k === 'text') {
//             calcTextLines(pen);
//         }
//     }
//   }
//   /**
//    * 值类型为 number , pen.linear 为 false 时，且 key 不属于 noLinear 时，返回 true
//    * @param value 值
//    * @param key 键值
//    * @param pen 画笔
//    * @returns
//    */
//   function isLinear(value, key, pen) {
//       // 不线性变化的属性
//       var noLinear = ['strokeType', 'bkType', 'showChild'];
//       return (typeof value === 'number' &&
//           pen.linear !== false &&
//           !noLinear.includes(key));
//   }
//   let _this = this;
//   requestAnimationFrame(function () {
//     setNodeAnimate(pen, now);
//     _this.customAnimate(pen);
//   });
// };
export var topology = Topology