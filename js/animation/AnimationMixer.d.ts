import {AnimationClip} from './AnimationClip';
import {AnimationAction} from './AnimationAction';
import {EventDispatcher} from './../core/EventDispatcher';

export class AnimationMixer extends EventDispatcher {

    time: number;
    timeScale: number;

    constructor(root: any);

    clipAction(clip: AnimationClip, root?: any): AnimationAction;

    existingAction(clip: AnimationClip, root?: any): AnimationAction;

    stopAllAction(): AnimationMixer;

    update(deltaTime: number): AnimationMixer;

    getRoot(): any;

    uncacheClip(clip: AnimationClip): void;

    uncacheRoot(root: any): void;

    uncacheAction(clip: AnimationClip, root?: any): void;

}
