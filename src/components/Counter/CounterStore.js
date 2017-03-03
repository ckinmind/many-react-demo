import {observable,action,computed, reaction} from 'mobx';
export default class CounterStore {
    @observable count = 0;
    @action changeNum(name){
        if(name==='plus'){
            this.count ++;
        }else{
            this.count --;
        }
    }

}