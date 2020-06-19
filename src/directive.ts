
import Vue from 'vue';

const config = {
  bgColor: '#EFEFEF',
  btnBgColor: '#cceba3'
};

enum SkeletonType {
  CARD = 'card',
  ROUND = 'round',
  TEXT = 'text',
  BUTTOON = 'button'
}

enum SkeletonSize {
  LARGE = 'large',
  BASE = 'base',
  SMALL = 'small',
  MINI = 'mini'
}

interface SkeletonData {
  type: SkeletonType;
  size?: SkeletonSize;
  style?: string;
}

export const skeleton = {
  inserted: function(el: Element, binding: any, vnode: any) {
    // console.log(el, 'skeleton');
    var s = JSON.stringify;
    let drawSkeleton = function(
      vnodeElm: any,
      skeletonData: SkeletonData = { type: SkeletonType.CARD, size: SkeletonSize.BASE }
    ) {
      let typeStyle = '';
      let typeText = '';
      let typeHtml = '';
      switch (skeletonData.type) {
        case SkeletonType.TEXT:
          typeText = '';
          typeStyle = `background-color: ${config.bgColor};` + skeletonData.style;
          break;
        case SkeletonType.CARD:
          typeHtml = '';
          typeStyle = `` + skeletonData.style;
          break;
        case SkeletonType.BUTTOON:
          typeStyle = `` + skeletonData.style;
          break;
        case SkeletonType.ROUND:
          typeStyle =
            `background-color: ${config.bgColor}; width: 50px; height: 50px; border-radius: 50px;` + skeletonData.style;
          break;
        default:
          break;
      }

      vnodeElm.innerText = '';
      vnodeElm.innerHtml = typeHtml;
      vnodeElm.style = typeStyle;
      vnodeElm.classList.add('v-skeleton');
      vnodeElm.classList.add(`v-skeleton-${skeletonData.type}`);
      vnodeElm.classList.add(`v-skeleton-${skeletonData.size}`);
    };

    let filterSkeleton = function(vnodeElm: any) {
      if (vnodeElm.attributes && vnodeElm.attributes['data-skeleton'] !== undefined) {
        const skeletonDataStr = vnodeElm.attributes['data-skeleton'].value;
        let skeletonData = {};
        if (skeletonDataStr) {
          // 参数转对象
          let splitStr = skeletonDataStr.split('&');
          for (var i = 0; i < splitStr.length; i++) {
            // @ts-ignore
            skeletonData[splitStr[i].split('=')[0]] = splitStr[i].split('=')[1];
          }
        }

        drawSkeleton(vnodeElm, skeletonData as SkeletonData);
      }
      if (vnodeElm.childNodes) {
        for (let i = 0; i < vnodeElm.childNodes.length; i++) {
          filterSkeleton(vnodeElm.childNodes[i]);
        }
      }
    };

    if (binding.value) {
      filterSkeleton(vnode.elm);
    }
  },
  update: function(el: HTMLElement, binding: any, vnode: any) {}
};