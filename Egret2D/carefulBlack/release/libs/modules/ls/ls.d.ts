declare module ls {
    class BaseClass extends egret.EventDispatcher {
        private _sid;
        private static UID;
        constructor();
        sid: number;
        className: string;
        getClass(): any;
        clone(): any;
    }
}
declare module ls {
    class loopSelections {
        loopIndex: number;
        instances: AIObject[];
    }
    class Action extends BaseClass {
        index: number;
        targetName: string;
        event: AIEvent;
        callTarget: any;
        paramData: any[];
        callHanlderName: string;
        isFamily: boolean;
        instances: any;
        prevAction: Action;
        nextAction: Action;
        conditionBlock: ConditionBlock;
        lastLoopSelectInstances: any[][];
        constructor();
    }
}
declare module ls {
    class BaseBehavior extends egret.EventDispatcher {
        enabled: any;
        inst: any;
        instanceName: string;
        name: string;
        paramInstances: any;
        isCreated: boolean;
        renderEnabled: boolean;
        constructor();
        onCreate(): void;
        tick(): void;
        saveToJSON(): any;
        loadFromJSON(o: any): void;
        getClass(): any;
        destory(): void;
        clone(): BaseBehavior;
    }
}
declare module ls {
    class Circle {
        center: Vector2D;
        radius: number;
    }
    /**
     * 暂时未实现椭圆之间的碰撞
     *
     */
    class Collision {
        /**碰撞检测 默认采用边界盒 0 多边形 1 圆 2 点 */
        static checkCollision(inst1: AIDisplayObject, inst2: AIDisplayObject): boolean;
        /**
         * 检测两个对象多边形碰撞是否参与碰撞
         * @param polygonInst1
         * @param polygonInst2
         */
        static checkPolygonCollisionPolygon(polygonInst1: AIDisplayObject, polygonInst2: AIDisplayObject): boolean;
        static isCollsionWithRect(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number): boolean;
        static checkCommonCollision(inst1: AIDisplayObject, inst2: AIDisplayObject): boolean;
        /**
         * 检测点与点的碰撞
         * @param dotInst1 实例1 点
         * @param dotInst2 实例2 点
         */
        static checkDotCollisionDot(dotInst1: AIDisplayObject, dotInst2: AIDisplayObject): boolean;
        /**
         * 检测点与圆碰撞检测（点到圆心的距离小于半径），暂时不支持椭圆
         * @param dotInst 实例1 点
         * @param circleInst 实例2 圆
         */
        static checkDotCollisionCircle(dotInst: AIDisplayObject, circleInst: AIDisplayObject): boolean;
        /**
         * 检测点与任意多边形凸碰撞检测
         * 原理：按顺时针，点到多边形某个点的向量与某个点与下一个点所形成的向量所形成的夹角，遍历所有，进行cross运算，如果有小于零的值，则不相交，否则相交
         * @param dotInst 实例1 点
         * @param polygonInst 实例2 多边形
         */
        static checkDotCollisionPolygon(dotInst: AIDisplayObject, polygonInst: AIDisplayObject): boolean;
        /**
         * 检测圆与圆碰撞
         * @param circleInst1 实例1 圆
         * @param circleInst2 实例2 圆
         */
        static checkCircleCollisionCircle(circleInst1: AIDisplayObject, circleInst2: AIDisplayObject): boolean;
        /**
         * 圆与多边形碰撞检测，1、需要检测圆心多边形点的距离大小，2、需要检测圆心到边的投影距离大小
         * @param circleInst 实例1 圆数据
         * @param polygonInst 实例2 多边形数据
         */
        static checkCircleCollisionPolygon(circleInst: AIDisplayObject, polygonInst: AIDisplayObject): boolean;
        static circleCollisionLine(circle: Circle, lineP1: Vector2D, lineP2: Vector2D): boolean;
        static pointToSegDist(x: number, y: number, x1: number, y1: number, x2: number, y2: number): number;
        /**
         * 点到直线的距离
         * @param 点矢量
         * @param lineP1 直线某点
         * @param lineP2 直线另外一点
         */
        static distFromPointToLine(p: Vector2D, lineP1: Vector2D, lineP2: Vector2D): number;
    }
}
declare module ls {
    class Quad {
        tlx: number;
        tly: number;
        trx: number;
        try_: number;
        brx: number;
        bry: number;
        blx: number;
        bly: number;
        private minresult;
        private maxresult;
        constructor();
        offset(px: number, py: number): Quad;
        set_from_rect(rc: egret.Rectangle): void;
        set_from_rotated_rect(rc: egret.Rectangle, a: number): void;
        midX(): number;
        midY(): number;
        at(i: any, xory: any): number;
        minmax4(a: number, b: number, c: number, d: number): void;
        bounding_box(rc: any): void;
        contains_pt(x: number, y: number): boolean;
        segments_intersect(a1x: number, a1y: number, a2x: number, a2y: number, b1x: number, b1y: number, b2x: number, b2y: number): boolean;
        intersects_segment(x1: number, y1: number, x2: number, y2: number): boolean;
        intersects_quad(rhs: any): boolean;
    }
}
declare module ls {
    interface QuadChild {
        currenttreelevel: number;
        lasttreelevel: number;
        currentlinknodes: number[];
        fetchSig: number;
        curnodesinfo: string;
        tempnodeinfo: string;
        getTransBoundData(): number[];
    }
}
declare module ls {
    class QuadTree {
        constructor(index: number, level: number, parent: QuadTree, bound: number[]);
        getTreeBoundInfo(szbounds: any[]): void;
    }
}
declare module ls {
    class IntersectionStruct {
        intersectionIndex: number;
        intersectionPoint: Vector2D;
        constructor();
        getPrevIndex(curIndex: number, len: number): number;
        getNextIndex(curIndex: number, len: number): number;
        isConcavePoly(vs: Vector2D[]): boolean;
        onSeparateConcavePoly(vs: Vector2D[]): any[];
        getNextConcaveIndex(vs: Vector2D[], startIndex?: number): number;
        getAllConvaveIndex(vs: Vector2D[], startIndex?: number): number[];
        private separateConcavePoly(vs, szlist, startIndex);
        /**根据分割点分割 */
        private splitPolyByIntersection(vs, concaveIndex, szleft, szright);
        /**
         * 基于顶点可见性的局部剖分算法
         * @see http://www.doc88.com/p-114690887292.html
         */
        private getSplitPointByRgnBCinter(vs, concaveIndex);
        /**
         * 获取三点方向
         * @param v1 当前点
         * @param v2 上一点
         * @param v3 下一点
         */
        private getMultiPtClockDir(v1, v2, v3);
        /**
         * 获取多边形某一点的方向
         * @param vs 多边形点列表
         * @param index 索引
         */
        private getMultiPtClockDirByIndex(vs, index);
        /**
         * 是否是逆时针旋转
         * @param vs 多边形点列表
         */
        private isAntiClockDir(vs);
        private isInsection(sv1, ev1, sv2, ev2);
        /**
         * 判断是否是可见点
         * @param vs 多边形点集
         * @param concaveIndex 凹点索引
         * @param regionIndex 区域点索引
         */
        private isVisiblePtOnConcave(vs, concaveIndex, regionIndex);
        /**
         * 获取区域内的可见点列表
         */
        private getVisiblePtsOnRegion(vs, concaveIndex, region);
        /**
         * 设置区域分隔 A:凸点集合 B:凹点集合
         */
        private setSplitByRegion(vs, region1, setA, setB);
        private dotProd(v1, v2);
        /**
         * 获取最好的相交点
         */
        private getBestIntersectionPt(vs, concaveIndex, ptsets);
        private getCrossByRadialAndSegment(sv1, ev1, sv2, ev2, crossV);
        /**
         * 用来返回点与直线的位置关系
         * @param v1 直线上的点1
         * @param v2 直接上的点2
         * @param randomV 直线上任意一点
         */
        private getPosRelationToLine(v1, v2, randomV);
    }
}
declare module ls {
    class SAT {
        constructor();
        static sat(pos1: Vector2D, pos2: Vector2D, v1: Vector2D[], v2: Vector2D[]): boolean;
        /**
         * 计算是否相交，顺序传入多边形顶点,比较场景内的绝对坐标，如果为凹多边形，先用separateConcavePoly函数分解成凸多边形
         * @param pos1 多边形1位置
         * @param pos2 多边形2位置
         * @param v1 多边形1顶点数据
         * @param v2 多边形2顶点数据
         */
        static convexsat(pos1: Vector2D, pos2: Vector2D, v1: Vector2D[], v2: Vector2D[]): boolean;
        /**
         * 获取多边形需要计算的分离轴
         * @param vs 多边形顶点列表
         * @param curaxis 轴
         */
        private static getUniqueAxis(vs, curaxis);
        static overlap(s1: Vector2D, s2: Vector2D): boolean;
        static getPolyBound(vs: Vector2D[]): number[];
        static getCircleBound(vs: Vector2D[]): number[];
        private static getProjection(pos, p, axis);
    }
}
declare module ls {
    /**
     * 条件数据，条件返回值接口
     */
    interface IConditionData {
        instances: any[];
        status: boolean;
        data?: any;
        selectSingle?: boolean;
    }
    class Condition extends BaseClass {
        index: number;
        targetName: string;
        prevCondition: Condition;
        nextCondition: Condition;
        firstCondition: Condition;
        callTarget: any;
        callCondition: Function;
        callConditionName: string;
        paramsInstance: BaseEvent;
        paramClassName: string;
        isTrigger: boolean;
        isInvert: boolean;
        event: AIEvent;
        operatorType: number;
        loop: boolean;
        currentStatus: boolean;
        statusInfo: any;
        conditionInstances: any;
        conditionBlock: ConditionBlock;
        instanceTypeStatus: any;
        triggerData: any;
        isFamily: boolean;
        constructor();
        isFirstCondition: boolean;
    }
}
declare module ls {
    interface MergeInstance {
        instance: AIObject;
        status: boolean;
    }
    class ConditionBlock {
        index: number;
        conditions: Condition[];
        actions: Action[];
        firstConditionBlock: ConditionBlock;
        prevConditionBlock: ConditionBlock;
        nextConditionBlock: ConditionBlock;
        results: any[];
        event: AIEvent;
        status: boolean;
        loopDatas: any[];
        loopLayers: number;
        private lastActionResults;
        instancesStatus: any;
        cs: any;
        loop: boolean;
        execActions(searchInstances: any): void;
        execForEach(data: any, instances: Array<AIObject>): Array<AIObject>;
        execLoopAction(isloop: boolean, instances: AIObject[], loopIndex?: number): void;
        /** 执行下一个动作 */
        execLoopNextAction(action: Action, isloop: boolean, instances: AIObject[], loopIndex?: number): void;
        /**执行单独的动作 */
        execSingleAction(action: Action, computedInstances: AIObject[], loopIndex?: number): any[];
    }
}
declare module ls {
    class Config {
        static onStartOfLayout: boolean;
        static sceneWidth: number;
        static sceneHeight: number;
        static version: number;
        static isHasJpg: boolean;
        static isHasPng: boolean;
        static sceneInfo: any;
        static openLog: boolean;
    }
}
declare module ls {
    class BaseEvent extends BaseClass {
        aiObject: AIObject;
        data: any;
        triggerDatas: any;
        isFamily: boolean;
    }
}
declare module ls {
    class AIEvent extends BaseEvent {
        index: number;
        conditionBlocks: ConditionBlock[];
        conditionRelationShip: boolean;
        triggerOnceWhileTrue: boolean;
        parent: AIEvent;
        children: AIEvent[];
        lastFilterTargets: any;
        execActionIndex: number;
        computeTargets: any;
        enabled: boolean;
    }
}
declare module ls {
    class KeyboardEvent extends egret.Event {
        static KEY_DOWN: string;
        static KEY_UP: string;
        location: number;
        keyCode: number;
        shiftKey: boolean;
        which: number;
        locale: string;
        key: string;
        altKey: boolean;
        metaKey: boolean;
        char: string;
        ctrlKey: boolean;
        repeat: boolean;
        charCode: number;
    }
}
declare module ls {
    class OnForEachArrayElementEvent extends BaseEvent {
        xyzDimention: any;
        array: any;
    }
}
declare module ls {
    class TriggerEvent extends egret.Event {
        static TRIGGER: string;
        triggerCondition: Function;
        triggerData: any;
        triggerTargets: any[];
        constructor(type: string, triggerCondtion: Function, triggerData?: any, bubbles?: boolean, cancelable?: boolean);
    }
}
declare module ls {
    class EventSheetVo {
        eventSheetName: string;
        nextEventSheetName: string;
        prevEventSheetName: string;
        layoutName: string;
        version: string;
    }
    class FamilyVo {
        name: string;
        UIDs: number[];
        behaviors: BaseBehavior[];
        variables: any[];
        insts: AIDisplayObject[];
    }
    class VariableVo {
        name: string;
        initValue: string;
        variableType: string;
    }
    class CollisionDataVo {
        type: number;
        datas: any;
    }
    class EventSheetDecoder {
        static curSceneInstancesData: Array<any>;
        static curSceneEventsData: Array<any>;
        static curSceneAiObjects: Array<any>;
        static curSceneAiObjectsHash: Object;
        static curSceneEvents: Array<AIEvent>;
        static curFamilys: any;
        static eventSheets: Object;
        static currentEventSheetName: string;
        static collisionSearchs: any;
        static lastTickTime: number;
        static _tick: number;
        static eventsheetVo: EventSheetVo;
        static testShape: egret.Sprite;
        static expressionObject: Object;
        static triggerConditions: Array<Condition>;
        static onCollisionTick: Function;
        static onEventSheetTick: Function;
        static saveEventSheetData(eventSheetName: string): void;
        static start(eventSheetName: string): void;
        static decode(): void;
        /**解析表达式 */
        static decodeExpressions(): void;
        static decodePropertys(): void;
        static decodeFamily(data: any): FamilyVo;
        static decodeVaraible(data: any): VariableVo;
        static decodeEvents(): void;
        static decodeEvent(eventData: any, index: number): AIEvent;
        static decodeInstancePropertie(data: any, instance: AIObject): void;
        static decodeBehavior(data: any): BaseBehavior;
        static decodeConditionBlock(data: any, index: number, event: AIEvent): ConditionBlock;
        static instancesConditions: any;
        /**
         * 解析条件属性(条件属性要在运行时一直解析，否则，很多时候读取的值可能不是动态的，只是初始化的值)
         * 并且条件属性中可能会有组
         */
        static decodeConditionProperties(eventsid: number, conditionIndex: number, conditionInstance: BaseEvent): BaseEvent;
        static decodeConditionFamilyProperties(conditionInstance: BaseEvent, data: any): any[];
        static decodeCondition(data: any, index: number, event: AIEvent): Condition;
        static decodeAction(data: any, index: number, event: AIEvent): Action;
        /**解析动作参数 */
        static decodeActionParams(action: Action): any;
        static tick(): number;
        static eventsheetRender(event: egret.Event): void;
        static oldTime: number;
        static onRenderUpdate(): void;
        static renderCamera(): void;
        static onInstancesCreate(): void;
        static renderBehaviors(): void;
        static renderEvents(): void;
        static execEvent(event: AIEvent, triggerInfo?: TriggerInfo): void;
        static execConditionBlock(cb: ConditionBlock, triggerInfo: TriggerInfo): void;
        /**
         * 执行下一个条件
         * c2做了特殊处理，触发条件产生的过滤与普通条件不一致
         */
        static execNextCondition(c: Condition, cb: ConditionBlock, triggerInfo: TriggerInfo, onComplete?: Function): void;
        static checkCollistions(): void;
        static execScenePauseOrPlay(type: number): void;
        static destory(): void;
    }
}
declare module ls {
    var loopIndex: Object;
    function assert(cnd: any, msg: string): void;
    /**注册对象给windows */
    function registerObject(name: string, instance: any): void;
    function lakeshoreInst(): any;
    function eval_e(exp: any): any;
    /**获取循环索引 */
    function getloopIndex(key: any): number;
    /**返回当前运行的fps */
    function fps(): number;
    /**返回当前运行时每帧的运行时间间隔（单位：ms） */
    function dt(): number;
    /**返回当前场景对象数量 */
    function objectcount(): number;
    /**获取当前真实运行时间间隔与理论时间间隔的比例（获取在帧运行的过程中因帧频不稳定而带来的运动错误）*/
    function timeScale(): number;
    var oldtime: number;
    /**返回自游戏运行以来运行的时间（单位：毫秒）*/
    function time(): number;
    /** 添加日志输出口 */
    function log(args: any): void;
    /**当前运行环境是否是pc */
    function isPc(): boolean;
    /**注入属性 */
    function injectProp(target: Object, data?: Object, ignroeMethod?: boolean): boolean;
    /**获取毫秒 */
    function getMiniSeconds(str: string): number;
    /**
     * 获取倒计时字符串
     */
    function getRemainTimeStr(str: string, splitStr?: string, showZero?: boolean): string;
    var internalData: any[];
    var cacheInternal: any;
    var cachePlugins: any;
    /**
     * 判断当前实例是否在场景上
     * TODO
     */
    function isInternal(name: string): boolean;
    function getPlugin(name: string): string;
    function isSingleInst(name: string): boolean;
    var singles: any;
    function getInstanceByInstanceName(name: string): any;
    /**根据类名获取实例 */
    function getInstanceByPluginClassName(name: string, isCreate?: boolean): any;
    /**
     * 根据地址获取纹理数据
     */
    function getTexture(url: string): Array<any>;
    /**
     * 根据地址获取名字
     */
    function getName(url: string): string;
    function getTransformationStr(str: string): string;
    function xmlToJson(xml: egret.XML): any;
    function round6dp(x: number): number;
    function is_undefined(x: any): boolean;
    function is_number(x: any): boolean;
    function is_string(x: any): boolean;
    /**返回数value的绝对值 */
    function abs(value: any): number;
    /**返回数value的反余弦值 */
    function acos(value: any): number;
    function angle(x1: any, y1: any, x2: any, y2: any): number;
    /**返回数value的反正弦值 */
    function asin(value: any): number;
    /**以介于 -PI/2 与 PI/2 弧度之间的数值value来返回 x 的反正切值 */
    function atan(value: any): number;
    /**返回从 x 轴到点 (x,y) 的角度（介于 -PI/2 与 PI/2 弧度之间） */
    function atan2(y: any, x: any): number;
    /**对数value进行向上取整 */
    function ceil(value: any): number;
    /**对数value进行向下取整 */
    function floor(value: any): number;
    /**返回角value的正弦 */
    function sin(value: any): number;
    /**返回角value的余弦 */
    function cos(value: any): number;
    /**返回数value的平方根 */
    function sqrt(value: any): number;
    /**返回角value的正切 */
    function tan(value: any): number;
    function cosp(a: any, b: any, x: any): number;
    /**
     * 计算点(x1,y1)与点(x2,y2)之间的距离
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     */
    function distance(x1: any, y1: any, x2: any, y2: any): number;
    /**
     * e的value次方
     */
    function exp(value: any): number;
    /**
     * 返回x的y次幂
     */
    function pow(x: any, y: any): number;
    function getbit(num: any, bit: any): number;
    /**插值 */
    function lerp(a: any, b: any, x: any): number;
    function unlerp(a: any, b: any, c: any): number;
    function log10(value: any): number;
    /**返回value1与值value2中的最高值 */
    function max(value1: any, value2: any): number;
    /**返回value1与值value2中的最低值 */
    function min(value1: any, value2: any): number;
    /**返回圆周率（约等于3.14159） */
    function pi(): number;
    function qarp(a: any, b: any, c: any, x: any): number;
    /**将数字value进行四舍五入运算 */
    function round(value: any): number;
    /**获取0~1之间的任意数 */
    function random(): number;
    function togglebit(value: any, bit: any): number;
    /**将值value转换成浮点型 */
    function float(value: any): number;
    /**将值value转换成整型 */
    function int(value: any): number;
    /**将红绿蓝值转化为rgb值 */
    function rgb(red: any, green: any, blue: any): number;
    /**根据rgb值获取红色值 */
    function getRed(rgb: any): number;
    /**根据rgb值获取绿色值 */
    function getGreen(rgb: any): number;
    /**根据rgb值获取蓝色值 */
    function getBlue(rgb: any): number;
    function regexp_escape(text: any): string;
    function find(text: any, searchstr: any): number;
    function replace(text: any, find: any, replace_: any): string;
    function left(text: any, count: any): string;
    function right(text: any, count: any): string;
    function len(value: any): number;
    function toFixed(text: any, fractionDigts: any): number;
    function lowercase(text: any): string;
    function upppercase(text: any): string;
    function trim(text: any): string;
    function mid(text: any, index: any, length: any): string;
    function newline(): string;
    function zeropad(num: any, digits: any): string;
    function choose(): number;
    function getTime(): number;
    function week(): number;
    function year(): number;
    function month(): number;
    function day(): number;
    function hours(): number;
    function minutes(): number;
    function seconds(): number;
    function minuteSeconds(): number;
    function clamp(x: any, l: any, u: any): number;
    function isWeixinLogin(): boolean;
    class OperationType {
        static EQUAL_TO: string;
        static NOT_EQUAL_TO: string;
        static LESS_THAN: string;
        static LESS_OR_EQUAL: string;
        static GREATER_THAN: string;
        static GREATER_OR_EQUAL: string;
    }
    class InstanceVariablesType {
        static TEXT: string;
        static INT: string;
        static NUMBER: string;
        static BOOLEAN: string;
    }
    /**
     * 比较运算符（值都被转换了）
     */
    function compare(curValue: any, operand: string, comValue: any): boolean;
}
declare module ls {
    class LayerManager {
        static layers: Array<egret.Sprite>;
        constructor();
        static getLayerByIndex(target: AIObject, index: number): egret.Sprite;
        static getIndexByLayer($layer: egret.Sprite): number;
        static getLayer($index: number): egret.Sprite;
    }
}
declare module ls {
    class LayerVo {
        index: number;
        parallaxX: number;
        parallaxY: number;
        layerAlpha: number;
        layerVisible: boolean;
        layerScaleX: number;
        layerScaleY: number;
    }
}
declare module ls {
    class Vector2D {
        _x: number;
        _y: number;
        constructor(x?: number, y?: number);
        x: number;
        y: number;
        length: number;
        lengthSQ: number;
        angle: number;
        rotation: number;
        normalize(): Vector2D;
        truncate(max: number): Vector2D;
        reverse(): Vector2D;
        isNormalized(): boolean;
        dotProd(v2: Vector2D): number;
        crossProd(v2: Vector2D): boolean;
        getCross(v2: Vector2D): number;
        static angleBetween(v1: Vector2D, v2: Vector2D): number;
        perp: Vector2D;
        sign(v2: Vector2D): number;
        distance(v2: Vector2D): number;
        distanceSQ(v2: Vector2D): number;
        equals(v2: Vector2D): boolean;
        isZero(): boolean;
        scale(value: number): Vector2D;
        add(x: number, y: number): Vector2D;
        substruct(x: number, y: number): Vector2D;
        multiply(x: number, y: number): Vector2D;
        divide(x: number, y: number): Vector2D;
        clone(): Vector2D;
        toString(): string;
    }
}
declare module ls {
    class Layout {
        version: string;
        layoutName: string;
        nextLayoutName: string;
        prevLayoutName: string;
        eventSheetName: string;
    }
    class LayoutDecoder {
        static curSceneInstances: any;
        static instanceNames: Object;
        static layouts: Object;
        static sceneWidth: number;
        static sceneHeight: number;
        static currentLayoutName: string;
        static spriteSheets: any;
        static spriteSheetDatas: any;
        static globalInstances: AIObject[];
        static layers: any;
        static getTexture(name: string): egret.Texture;
        static saveLayout(layoutName: string): void;
        static start(layoutName: string): void;
        static decodeInstances(datas: any): Array<AIObject>;
        static decodeLayers(data: any): LayerVo;
        static decodeInstance(data: any): AIObject;
        static decodeCollision(inst: AIDisplayObject, data: any): any;
        static decodeBehaviors(instance: AIObject, datas: any): void;
        /**
         * 销毁实例
         */
        static destory(): void;
    }
}
declare module ls {
    class Log {
        private static logText;
        private static logCache;
        static log(message: string): void;
    }
}
declare module ls {
    class GameUILayer extends egret.DisplayObjectContainer {
        static renderContainer: egret.Sprite;
        static stage: egret.Stage;
        static preContainer: egret.Sprite;
        static loadingContainer: egret.Sprite;
        static document: egret.DisplayObjectContainer;
        static testContainer: egret.Sprite;
        static drawContainer: egret.Sprite;
        static debugContainer: egret.Sprite;
        static touchX: number;
        static touchY: number;
        constructor();
        static init($stage: egret.Stage): void;
        static onStageTouchEvent(event: egret.TouchEvent): void;
    }
}
declare module ls {
    class SceneCamera {
        private scene;
        private pos;
        private _scrollX;
        private _scrollY;
        private oldSceneX;
        private oldSceneY;
        private newSceneX;
        private newSceneY;
        private lookAtTarget;
        private updateCamera;
        constructor(scene: World);
        resetCamera(): void;
        lookAtPoint(pos: egret.Point): void;
        lookAtX(x: number): void;
        lookAtY(y: number): void;
        lookAtChar(target: AIDisplayObject): void;
        private _oldSceneX_;
        private _oldSceneY_;
        render(): void;
        renderContainer(): void;
    }
}
declare module ls {
    class World {
        private static _instance;
        private static renderFirst;
        private _objectList;
        private _objectHash;
        private _isCollision;
        private _bounds;
        private _updateCamera;
        private _sceneCamera;
        private _childCaches;
        static onWorldDestory: Function;
        constructor();
        static getInstance(): World;
        sceneCamera: SceneCamera;
        /**获取世界中的AI对象列*/
        objectList: any[];
        /**获取世界中的AI Hash结构列表*/
        objectHash: Object;
        scrollToTarget(inst: AIDisplayObject): void;
        scrollToXY(x: number, y: number): void;
        scrollToX(x: number): void;
        scrollToY(y: number): void;
        render(): void;
        /**根据唯一id查找对象*/
        getChildByUID($uid?: number): AIObject;
        /**根据名字查找AiObject对象列表，一般情况下，多个名称列表都是表示关联复制生成的，而不是直接创建生成的*/
        getChildByName($name: string): Array<AIObject>;
        addChild($child: AIObject, $parent?: AISprite): void;
        removeChild($child: AIObject): void;
        removeAllChildrens(): void;
        destory(): void;
    }
}
declare module ls {
    class AIObject extends egret.EventDispatcher {
        id: number;
        name: string;
        isModel: boolean;
        timeScale: number;
        parallaxX: number;
        parallaxY: number;
        isDead: boolean;
        global: boolean;
        variables: any;
        index: number;
        plugin: string;
        paramInstances: any;
        actionSaves: any;
        currentStatus: boolean;
        selfStatus: boolean;
        static _uniqueID: number;
        static U_ID: number;
        private _uid;
        isSceneObject: boolean;
        constructor();
        u_id: number;
        dt: number;
        getClass(): any;
        /**
         * 初始化，所有的插件都扩展自这个
         */
        initialize(): void;
        /**
         * 每帧频执行一次
         */
        onTick(): void;
        addVariable(variableName: string, value: any): void;
        getFirstPicked(): AIObject;
        /**比较两个值*/
        compareTwoValue($compareTwoValues: CompareTwoValuesEvent): IConditionData;
        /**判断值是否在两个值内*/
        isBetweenValues($isBetweenValues: IsBetweenValuesEvent): IConditionData;
        /**是否是数字*/
        isNumberNaN($isNumberNaN: IsNumberNaNEvent): IConditionData;
        /**
         * 切换场景时销毁
         *
         */
        destoryOnChangeScene(): void;
        destory(): void;
        saveToJSON(): any;
        loadFromJSON(o: any): void;
        clone(): AIObject;
    }
    class CompareTwoValuesEvent extends BaseEvent {
        operationType: string;
        value1: any;
        value2: any;
    }
    class IsBetweenValuesEvent extends BaseEvent {
        value: any;
        lowerValue: any;
        highValue: any;
    }
    class IsNumberNaNEvent extends BaseEvent {
        value: any;
    }
}
declare module ls {
    class AIDisplayObject extends AIObject {
        private _container;
        private _isAddToStage;
        private _collision;
        private _isCollisioning;
        private _isupdatebounds;
        private _cachebounds;
        private _cacheglobalbounds;
        private _cacheCollisionPolygonDatas;
        private _mirrored;
        protected _sourceWidth: number;
        protected _sourceHeight: number;
        protected _x: number;
        protected _y: number;
        protected _anchorX: number;
        protected _anchorY: number;
        protected _anchorOffsetX: number;
        protected _anchorOffsetY: number;
        protected _width: number;
        protected _height: number;
        protected _scaleX: number;
        protected _scaleY: number;
        protected _scale: number;
        protected _angle: number;
        protected _alpha: number;
        protected _visible: boolean;
        protected _touchX: number;
        protected _touchY: number;
        protected _touchStageX: number;
        protected _touchStageY: number;
        protected _touchPointID: number;
        protected _isTouchDown: boolean;
        behaviors: BaseBehavior[];
        layer: number;
        vx: number;
        vy: number;
        helpContainer: egret.Sprite;
        cacheRect: egret.Rectangle;
        isInScreenOnce: boolean;
        solidEnabeld: boolean;
        platformEnabled: boolean;
        jumpthruEnabled: boolean;
        collisionData: string;
        collisionSourceData: string;
        collisionType: number;
        collisionVectorData: any;
        collisionSourceVectorData: any;
        collisionIsRect: boolean;
        relyOnTarget: AIDisplayObject;
        oldParallaxX: number;
        oldParallaxY: number;
        scaleContainer: boolean;
        oldSceneX: number;
        oldSceneY: number;
        update: boolean;
        isHasCamera: boolean;
        constructor();
        protected onTouchEvent($event: egret.TouchEvent): void;
        onCreate(): void;
        layerIndex: number;
        enabled: boolean;
        collision: boolean;
        isCollsioning: boolean;
        isOnScreen: boolean;
        getBounds(): egret.Rectangle;
        private _globalBoundRect;
        getGlobalBounds(): egret.Rectangle;
        getCacheCollisionPolygonData(): any[];
        renderUpdate(): void;
        box: egret.Rectangle;
        private _quad;
        quad: Quad;
        private isOldCollision;
        private collisionTarget;
        setIsColliding(isColliding: boolean, target: AIDisplayObject): void;
        mirrored: number;
        private _scaleXChanged;
        private _scaleYChanged;
        /**
         * 根据行为类名获取行为
         *
         */
        getBehavior($behaviorClass: any): BaseBehavior;
        addBehavior($behavior: BaseBehavior): boolean;
        removeBehavior($behavior: BaseBehavior): BaseBehavior;
        removeAllBehaviors(): void;
        container: egret.Sprite;
        x: number;
        y: number;
        width: number;
        height: number;
        /**角度(0~360)*/
        angle: number;
        alpha: number;
        visible: boolean;
        scale: number;
        scaleX: number;
        scaleY: number;
        anchorX: number;
        anchorOffsetX: number;
        anchorOffsetY: number;
        anchorY: number;
        isTouchDown($isTouchDownEvent: IsButtonDownEvent): IConditionData;
        onButtonTap($onTouchTapEvent: OnButtonTapEvent): IConditionData;
        onButtonBegin($onTouchBeginEvent: OnButtonBeginEvent): IConditionData;
        onButtonEnd($onTouchEnd: OnButtonEndEvent): IConditionData;
        onButtonMove($onTouchMoveEvent: OnButtonMoveEvent): IConditionData;
        onButtonReleaseOutside($onTouchReleaseOutside: OnButtonReleaseOutsideEvent): IConditionData;
        isEnabled($isButtonEnabledEvent: IsButtonEnabledEvent): IConditionData;
        /**判断当前显示对象是否在这两个角度之间*/
        isBetweenAngles($isBetweenAngles: IsBetweenAnglesEvent): IConditionData;
        /**判断是否是顺时针方向*/
        isclockwiseform($isClockwiseFrom: IsClockwiseFromEvent): IConditionData;
        private _isClosewideform(angle1, angle2);
        private _oldX;
        private _oldY;
        /**对象是否在运动*/
        isObjectMoving($event: IsObjectMovingEvent): IConditionData;
        onCreated($event: OnCreatedEvent): IConditionData;
        compareInstanceVariable($event: CompareInstanceVariableEvent): IConditionData;
        compareX($event: CompareXPosEvent): IConditionData;
        compareY($event: CompareYPosEvent): IConditionData;
        compareWidth($event: CompareWidthEvent): IConditionData;
        compareHeight($event: CompareHeightEvent): IConditionData;
        compareAlpha($event: CompareOpacityEvent): IConditionData;
        compareMirored($event: CompareMirroredStatusEvent): IConditionData;
        /**比较对象运动角度*/
        private _oldMoveX;
        private _oldMoveY;
        compareObjectMoveAngle($event: CompareObjectMoveAngleEvent): IConditionData;
        /**比较对象自身角度*/
        compareObjectAngle($event: CompareObjectAngleEvent): IConditionData;
        /**比较对象与目标点之间的距离*/
        compareTargetDistance($event: CompareTargetDistanceEvent): IConditionData;
        /**是否添加到舞台条件*/
        onAddToStage($onAddToStag: OnStartOfLayoutEvent): IConditionData;
        /**是否从舞台移除条件*/
        onRemoveToToStage(): IConditionData;
        /**是否在屏幕里或者外*/
        isOnScreenOrFalse($isOnScreen: IsOnScreenEvent): IConditionData;
        isVisible($isVisible: IsVisibleEvent): IConditionData;
        onCollisionWithOtherObject($onCollisionWidthOtherObject: OnCollisionWithOtherObjectEvent): IConditionData;
        onEnabledDisabledCollision($onCollisionWidthOtherObject: OnEnabledDisabledCollisionEvent): IConditionData;
        isOverlappingOtherObject($isOverlappingOtherObject: IsOverlappingOtherObjectEvent): IConditionData;
        onTweenComplete($event: OnTweenCompleteEvent): IConditionData;
        pickByUniqueID($event: PickByUniqueIDEvent): IConditionData;
        onDestory($event: OnDestoryEvent): IConditionData;
        addTo($instanceVariables: string, $value: any): void;
        setBoolean($instanceVariables: string, $value: any): void;
        setValue($instanceVariables: string, $value: any): void;
        subtractFrom($instanceVariables: string, $value: any): void;
        toogleBoolean($instanceVariables: string): void;
        spawn($object: AIDisplayObject, $layer: any, $offsetX: any, $offsetY: any, relyOnTarget: any): any;
        moveAtAngle($angle: any, $distance: any): void;
        moveForward($speed: any): void;
        /**以指定速度移动到目标点*/
        moveToTargetPoint(xpos: any, ypos: any, speed: any): void;
        rotateClockWise($angle: any): void;
        rotateCounterClockWise($angle: any): void;
        rotateTowardAngle($targetAngle: any, $step: any): void;
        rotateTowardPosition(x: any, y: any, $step: any): void;
        setAngle($angle: any): void;
        setAngleTowardPosition(x: any, y: any): void;
        setHeight($height: any): void;
        setMirrored($state: any): void;
        setPosition($x: any, $y: any): void;
        setPositionToAnotherObject($object: any, $offsetX: any, $offsetY: any): void;
        setScale($scale: any): void;
        setScaleX($scaleX: any): void;
        setScaleY($scaleY: any): void;
        setSize($width: any, $height: any): void;
        setVisible($visible: any): void;
        setAlpha($alpha: any): void;
        setWidth($width: any): void;
        setX($x: any): void;
        setY($y: any): void;
        setEnabled($enabled: any): void;
        setMask(maskTarget: any): void;
        /**
         * 这块非常容易引起性能上的问题，层容器越大，性能越低，尤其是层大小大于2048的时候
         */
        setMaskByLayer($layerIndex: any): void;
        setMaskIsNull(): void;
        /**
         * 添加颜色矩阵滤镜
         */
        addColorMatrixFilter(filterData: any): void;
        /**
         * 添加模糊滤镜
         */
        addBlurFilter(blurX: any, blurY: any): void;
        /**
         * 添加投影滤镜
         */
        addDropShadowFilter(distance: any, angle: any, color: any, alpha: any, blurX: any, blurY: any, strength: any, quality: any, inner: any, knockout: any, hideObject: any): void;
        /**
         * 添加发光滤镜
         */
        addGlowFilter(color: number, alpha: number, blurX: number, blurY: number, strength: number, quality: number, inner: boolean, knockout: boolean): void;
        /**
         * 根据类型移除滤镜
         */
        removeFilterByType(type: any): void;
        /**
         * 移除所有颜色滤镜
         */
        removeAllFilters(): void;
        execTween($key: any, $x: any, $y: any, $anchorX: any, $anchorY: any, $width: any, $height: any, $angle: any, $alpha: any, $duration: any, $ease: string, $waitTime: any, $loop: any, $scaleX: any, $scaleY: any): void;
        enabledDisabledCollision($status: any): void;
        onAddToStageHanlder(event: egret.Event): void;
        onRemoveToStageHanlder(event: egret.Event): void;
        destoryTest(): void;
        /**
         * 切换场景时销毁
         *
         */
        destoryOnChangeScene(): void;
        /**销毁*/
        destory(): void;
        saveToJSON(): any;
        loadFromJSON(o: any): void;
        clone(): AIDisplayObject;
    }
    class IsButtonDownEvent extends BaseEvent {
        operationType: string;
        distance: any;
    }
    class OnButtonTapEvent extends BaseEvent {
    }
    class OnButtonBeginEvent extends BaseEvent {
    }
    class OnButtonEndEvent extends BaseEvent {
    }
    class OnButtonMoveEvent extends BaseEvent {
    }
    class OnButtonReleaseOutsideEvent extends BaseEvent {
    }
    class IsButtonEnabledEvent extends BaseEvent {
    }
    class IsBetweenAnglesEvent extends BaseEvent {
        angle: any;
        angle1: any;
        angle2: any;
    }
    class IsClockwiseFromEvent extends BaseEvent {
        angle1: any;
        angle2: any;
    }
    class IsObjectMovingEvent extends BaseEvent {
    }
    class OnCreatedEvent extends BaseEvent {
    }
    class CompareInstanceVariableEvent extends BaseEvent {
        instanceVariable: string;
        operationType: string;
        value: any;
    }
    class CompareXPosEvent extends BaseEvent {
        operationType: string;
        x: any;
    }
    class CompareYPosEvent extends BaseEvent {
        operationType: string;
        y: any;
    }
    class CompareWidthEvent extends BaseEvent {
        operationType: string;
        width: any;
    }
    class CompareHeightEvent extends BaseEvent {
        operationType: string;
        height: any;
    }
    class CompareOpacityEvent extends BaseEvent {
        operationType: string;
        alpha: any;
    }
    class CompareMirroredStatusEvent extends BaseEvent {
        operationType: string;
        mirrored: any;
    }
    class CompareObjectMoveAngleEvent extends BaseEvent {
        operationType: string;
        angle: any;
    }
    class CompareObjectAngleEvent extends BaseEvent {
        operationType: string;
        angle: any;
    }
    class CompareTargetDistanceEvent extends BaseEvent {
        operationType: string;
        x: any;
        y: any;
        distance: any;
    }
    class OnStartOfLayoutEvent extends BaseEvent {
    }
    class IsOnScreenEvent extends BaseEvent {
        isOnScreen: any;
    }
    class IsVisibleEvent extends BaseEvent {
        isVisible: any;
    }
    class OnCollisionWithOtherObjectEvent extends BaseEvent {
        object: any;
    }
    class OnEnabledDisabledCollisionEvent extends BaseEvent {
        status: any;
    }
    class IsOverlappingOtherObjectEvent extends BaseEvent {
        object: any;
    }
    class PickByUniqueIDEvent extends BaseEvent {
        uniqueID: any;
    }
    class OnDestoryEvent extends BaseEvent {
    }
    class OnTweenCompleteEvent extends BaseEvent {
        key: any;
    }
}
declare module ls {
    class AISprite extends AIDisplayObject {
        protected _bitmapURL: string;
        protected _sourceWidth: number;
        protected _sourceHeight: number;
        private _isResourceLoaded;
        protected _bitmap: egret.Bitmap;
        constructor();
        bitmapURL: string;
        initialize(): void;
        /**创建位图*/
        createBitmap($url: string): void;
        addChild($aiSprite: AISprite): void;
        removeChild($aiSprite: AISprite): void;
        loadImage($url: any): void;
        width: number;
        height: number;
        onResourceLoaded($onResourceLoaded: OnResourceLoadedEvent): IConditionData;
        subtractFrom($instanceVariables: string, $value: any): void;
        saveToJSON(): any;
        loadFromJSON(o: any): void;
        clone(): AISprite;
    }
    class OnResourceLoadedEvent extends BaseEvent {
        constructor();
    }
}
declare module ls {
    class AISystem extends AIObject {
        private static _instance;
        private _orientation;
        private _gps;
        private _alpha;
        private _beta;
        private _gamma;
        private _latitude;
        private _longitude;
        private _altitude;
        private _speed;
        private _altitudeAccuracy;
        private _accuracy;
        private _heading;
        private _geolocationErrorMessage;
        private _geolocationErrorType;
        private _curTime;
        private _lastUpdate;
        private _lastTime;
        private _x;
        private _y;
        private _z;
        private _lastX;
        private _lastY;
        private _lastZ;
        private _timeScale;
        private SHAKE_THRESHOLD;
        private isShakeble;
        private _shakeDirection;
        dt1: number;
        dt: number;
        minimumFramerate: number;
        disableDataEvents: Object;
        globalVariables: any;
        constructor();
        private onDevice();
        private onOrientation(event);
        private onGetGeolocation();
        private onGeolocation(event);
        private onDeviceMotion();
        private ondeviceMotionHandler(eventData);
        private onDeviceVibrate();
        static instance: AISystem;
        sendSceneInitComplete(): void;
        runOs(event: RunOsEvent): IConditionData;
        isMobile(event: IsMobileEvent): IConditionData;
        onRunTimeType(event: RuntimeTypeEvent): IConditionData;
        runLanguageType(event: RunLanguageEvent): IConditionData;
        onGeolocationPermissionDenied(event: OnGeolocationPermissionDeniedEvent): IConditionData;
        onGeolocationFail(event: OnGeolocationFailEvent): IConditionData;
        onDeviceShake(event: OnDeviceShakeEvent): IConditionData;
        onDevicePostionChanged(event: OnDevicePositionChangedEvent): IConditionData;
        onDeviceOrientationChanged(event: onDeviceOrientationChangedEvent): IConditionData;
        onGameDataLoadComplete(event: OnGameDataLoadCompleteEvent): IConditionData;
        onGameDataSaveComplete(event: OnGameDataSaveCompleteEvent): IConditionData;
        /**每帧都执行*/
        everyTick($eventyTickEvent: EveryTickEvent): IConditionData;
        /**每多少秒执行的事件，这得改为触发条件，不然条件这块用多个会有问题*/
        everyXSecondEvent($everyXSecondEvent: EveryXSecondsEvent): IConditionData;
        /**当场景初始化完成Trigger*/
        onSceneInitComplete($event: OnSceneInitCompleteEvent): IConditionData;
        /**当退出场景时Trigger*/
        onSceneEndComplete($event: OnSceneEndCompleteEvent): IConditionData;
        /**是否是某个类型TODO*/
        isValueType($isValueType: IsValueTypeEvent): IConditionData;
        /**判断某个对象的UID是否存在*/
        ObjectUIDExist($objectUIDExist: ObjectUIDExistEvent): IConditionData;
        private cacheRegex;
        private lastRegex;
        private lastFlags;
        testRegex(event: TestRegexEvent): IConditionData;
        /**获取任意实例*/
        pickRandomInstance($pickRandomInstanceEvent: PickRandomInstanceEvent): IConditionData;
        /**获取所有实例*/
        pickAll($event: PickAllEvent): IConditionData;
        /**基于判断条件获取实例列表*/
        pickInstanceByCondition($event: PickByComparisionEvent): IConditionData;
        pickInstanceByIndex($event: PickInstanceByIndexEvent): IConditionData;
        pickInstanceOverlapping($event: PickInstanecOverlappingEvent): IConditionData;
        execFor(event: ForEvent): IConditionData;
        execForEachSort(event: ForEachOrderEvent): IConditionData;
        /**比较变量值*/
        compareVariable($event: CompareVariableEvent): IConditionData;
        onLayerIsExist(event: OnLayerIsExistEvent): IConditionData;
        onLayerIsVisible(event: OnLayerIsVisibleEvent): IConditionData;
        /** 创建对象 */
        createObject($object: any, $layer: any, $x: any, $y: any): any;
        /**切换场景 */
        gotoScene($layoutName: any): void;
        disableEvents($type: any, eventIDs: any): void;
        showLoadingLogo(time: any): void;
        /** 暂停或者继续播放场景 */
        onScenePauseOrPlay(type: any): void;
        log(args: any): void;
        addTo($instanceVariables: string, $value: any): void;
        setBoolean($instanceVariables: string, $value: any): void;
        setValue($instanceVariables: string, $value: any): void;
        subtractFrom($instanceVariables: string, $value: any): void;
        toogleBoolean($instanceVariables: string): void;
        stopLoop(): void;
        load($url: string): void;
        restartScene(): void;
        resetGlobalVariables(): void;
        scrollToObject($object: AIObject): void;
        scrollToPos($x: any, $y: any): void;
        scrollToXPos($x: any): void;
        scrollToYPos($y: any): void;
        setLayerAngle(layer: any, angle: any): void;
        setLayerBgColor(layer: any, bgColor: any): void;
        setLayerAlpha(layer: any, alpha: any): void;
        setLayerParallax(layer: any, parallaxX: any, parallaxY: any): void;
        setLayerScale(layer: any, scaleX: any, scaleY: any): void;
        setLayerVisible(layer: any, visible: any): void;
        setObjectTimeScale(object: any, timeScale: any): void;
        setTimeScale(timeScale: any): void;
        startDeviceOrientation(status: any): void;
        startDeviceGeolocation(status: any): void;
        onLoadComplete(): void;
        loadStorageFromJSON(key: any): void;
        saveStorageToJSON(key: any): void;
        /**销毁*/
        destory(): void;
        /**表示设备绕 Z 轴的角度，单位是 角度 范围是 0 到 360 */
        alpha: number;
        /**表示设备绕 X 轴的角度，单位是 角度 范围是 -180 到 180.这个值表示设备从前向后的旋转状态 */
        beta: number;
        /**表示设备绕 Y 轴的角度，单位是 角度 范围是 -90 到 90.这个值表示设备从左到右的旋转状态 */
        gamma: number;
        /**表示设备所在的纬度信息 */
        latitude: number;
        /**表示设备所在的经度信息 */
        longitude: number;
        /**表示设备所在的海拔信息 */
        altitude: number;
        /**表示设备所在的速度信息 */
        speed: number;
        /**表示设备正在前进的方向，单位是度。heading 表示从正北开始顺时针旋转到当前方向的角度，
         *比如正东是 90 度，正西是 270 度，如果 speed 是 0，heading 为 NaN。 */
        heading: number;
        /**经纬度的准确性，单位是米 */
        accuracy: number;
        /**该位置海拔信息的准确性，单位是米，这个值有可能为 null*/
        altitudeAccuracy: number;
        /** 获取位置信息错误的错误信息*/
        geolocationErrorMessage: string;
        geolocationErrorType: string;
    }
    class RunOsEvent extends BaseEvent {
        os: any;
    }
    class IsMobileEvent extends BaseEvent {
        mobile: any;
    }
    class RuntimeTypeEvent extends BaseEvent {
        runtimeType: any;
    }
    class RunLanguageEvent extends BaseEvent {
        language: any;
    }
    class OnGeolocationPermissionDeniedEvent extends BaseEvent {
    }
    class OnGeolocationFailEvent extends BaseEvent {
    }
    class OnDeviceShakeEvent extends BaseEvent {
    }
    class OnDevicePositionChangedEvent extends BaseEvent {
    }
    class onDeviceOrientationChangedEvent extends BaseEvent {
    }
    class EveryTickEvent extends BaseEvent {
        constructor();
    }
    class EveryXSecondsEvent extends BaseEvent {
        interval: any;
        oldTime: number;
        curTime: number;
        constructor();
    }
    class TestRegexEvent extends BaseEvent {
        str: any;
        regex: string;
        flags: string;
    }
    class OnSceneInitCompleteEvent extends BaseEvent {
        constructor();
    }
    class OnSceneEndCompleteEvent extends BaseEvent {
        constructor();
    }
    class IsValueTypeEvent extends BaseEvent {
        value: any;
        type: InstanceVariablesType;
        constructor();
    }
    class ObjectUIDExistEvent extends BaseEvent {
        UID: number;
        constructor();
    }
    class PickRandomInstanceEvent extends BaseEvent {
        object: AIObject;
        constructor();
    }
    class PickAllEvent extends BaseEvent {
        object: AIObject;
        constructor();
    }
    class PickByComparisionEvent extends BaseEvent {
        object: AIObject;
        expression: any;
        operationType: string;
        value: any;
        constructor();
    }
    class PickInstanceByIndexEvent extends BaseEvent {
        object: AIObject;
        index: any;
        constructor();
    }
    class PickInstanecOverlappingEvent extends BaseEvent {
        object: AIObject;
        x: any;
        y: any;
        constructor();
    }
    class CompareVariableEvent extends BaseEvent {
        variable: string;
        operationType: string;
        value: any;
        constructor();
    }
    class ForEachOrderEvent extends BaseEvent {
        object: AIObject;
        expression: any;
        order: any;
    }
    class ForEvent extends BaseEvent {
        name: any;
        startIndex: any;
        endIndex: any;
    }
    class OnGameDataLoadCompleteEvent extends BaseEvent {
        key: any;
    }
    class OnGameDataSaveCompleteEvent extends BaseEvent {
        key: any;
    }
    class OnLayerIsExistEvent extends BaseEvent {
        layer: any;
    }
    class OnLayerIsVisibleEvent extends BaseEvent {
        layer: any;
        isVisible: any;
    }
}
declare module ls {
    interface TriggerInfo {
        triggerTargets: any[];
        behaviorTarget?: BaseBehavior;
        compareCondition?: Condition;
        familyVo?: FamilyVo;
    }
    class Trigger {
        static register(target: any): void;
        static removeTrigger(target: any): void;
        static removeAllTriggers(): void;
        static onTrigger(event: TriggerEvent): void;
    }
}
declare module ls {
    class Base64 {
        private static _keyStr;
        static nativeBase64: boolean;
        static decode(input: string): string;
        static encode(input: string): string;
        static decodeBase64AsArray(input: string, bytes: number): Uint32Array;
        static decompress(data: string, decoded: any, compression: string): any;
        static decodeCSV(input: string): Array<number>;
    }
}
declare module ls {
    interface IBox {
    }
    interface Line {
        p1x: number;
        p1y: number;
        p2x: number;
        p2y: number;
    }
    class CollisionUtils {
        constructor();
        static isCollision(x1: number, y1: number, x2: number, y2: number, w: number, h: number): boolean;
        static isCollsionWithRect(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, w2: number, h2: number): boolean;
        static isCollisionPointWithCircle(x1: number, y1: number, x2: number, y2: number, r: number): boolean;
        static isCollisionCircleWithCircle(x1: number, y1: number, x2: number, y2: number, r1: number, r2: number): boolean;
        static isCollisionRectWithCircle(x1: number, y1: number, w1: number, h1: number, x2: number, y2: number, r: number): boolean;
        static checkPointCollideShape(p: egret.Point, shppos: egret.Point, szpt: Array<egret.Point>): boolean;
        static vectorCrossPoint(p0: egret.Point, p1: egret.Point, p2: egret.Point): number;
        static hitTest(lines1: Array<Line>, lines2: Array<Line>): boolean;
        static simpleLineTest(line1: Line, line2: Line): boolean;
        /**检测矩形1与矩形2是否相交 */
        static intersects_rect(rect1: egret.Rectangle, rect2: egret.Rectangle): boolean;
        /** 多边形相交 */
        static intersects_poly(a: any, b: any, offx: number, offy: number): boolean;
        static testOverlap(a: AIDisplayObject, b: AIDisplayObject): boolean;
        static getLines(object: AIDisplayObject): Array<Line>;
        static getSolidCollisionCandidates(layer: any, bbox: any, candidates: any): void;
        /**检测与绑定刚体行为的对象碰撞 */
        static testOverlapSolid(inst: AIDisplayObject): AIDisplayObject;
        static testOverlapJumpThru(inst: AIDisplayObject, all?: boolean): AIDisplayObject[];
        static pushInFractional(inst: AIDisplayObject, xdir: number, ydir: number, obj: AIDisplayObject, limit: number): void;
        static pushOutSolid(inst: AIDisplayObject, xdir: number, ydir: number, dist?: number, include_jumpthrus?: boolean, specific_jumpthru?: AIDisplayObject): boolean;
        static pushOutSolidNearest(inst: AIDisplayObject, maxDist: number): boolean;
        static registered_collisions: Array<any>;
        static registerCollision(a: AIDisplayObject, b: AIDisplayObject): void;
        static checkRegisteredCollision(a: AIDisplayObject, b: AIDisplayObject): boolean;
        static calculateSolidBounceAngle(inst: AIDisplayObject, startx: number, starty: number, obj?: AIDisplayObject): number;
    }
}
declare module ls {
    class MathUtils {
        constructor();
        static TO_RADIAN: number;
        static TO_ANGLE: number;
        static toRadian(a: number): number;
        static toAngle(radian: number): number;
        /**
         * 将角度转化为0~360度之间
         */
        static clampAngle(a: number): number;
        /**
         * 将弧度转化为0~2pi之间
         */
        static clampRadian(r: number): number;
        static angleRotate(start: number, end: number, step: number): number;
        static angleRadius(start: number, end: number, step: number): number;
        /** 是否是顺时针旋转 弧度制 */
        static angleClockWise(radian1: number, radian2: number): boolean;
        static angleTo(x1: number, y1: number, x2: number, y2: number): number;
        static radianTo(x1: number, y1: number, x2: number, y2: number): number;
        static distance(x1: number, y1: number, x2: number, y2: number): number;
        static color16ToUnit($color: string): number;
        static angleDiff(a1: number, a2: number): number;
    }
}
declare module ls {
    class Version {
        static version: string;
        /**
         * 比较版本大小 1：v1>v2 0:v1=v2 -1:v1<v2
         */
        static compareVersion(v1: string, v2: string): number;
    }
}
declare module ls {
    interface SceneInfo {
        layoutName: string;
        layoutUrl: string;
        layoutData?: any;
        eventsheetName: string;
        eventsheetUrl: string;
        eventsheetData?: any;
        baseUrl: string;
    }
    class StartUp {
        static baseUrl: string;
        static stage: egret.Stage;
        static globalData: any;
        static execute(document: egret.DisplayObjectContainer): void;
        static onLayerInit(document: egret.DisplayObjectContainer): void;
        static onPreResourceLoad(): void;
        static onProjectLoad(url: string, onComplete?: Function): void;
        static onGlobalConfigLoad(url: string, onComplete?: Function, onCompleteParams?: any[]): void;
        /**配置加载 */
        static onConfigLoad(layoutName: string): void;
    }
}
