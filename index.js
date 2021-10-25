let localBannerList = [];

window.onload = main;

function main() {
  if (localStorageDetected()) {
    localBannerList = getLocalStorage().filter(() => true);
    printBanners(localBannerList);
  }
}

function creatNewBanner() {

  let redirectLinkInput = document.getElementById('redirect-link');
  let imageUrlInput = document.getElementById('image-url');
  let redirect_link = redirectLinkInput.value;
  let banner_img_url = imageUrlInput.value;

  let banner = {
    redirectLink: redirect_link,
    imageUrl: banner_img_url
  };

  localBannerList.push(banner);
  createAlert('Submited');

  redirectLinkInput.value = '';
  imageUrlInput.value = '';

}

function localStorageSave() {

  window.localStorage.setItem('banners-data', JSON.stringify(localBannerList));
  removeBnnersFromDom(document.getElementById('banners-list'));
  printBanners(localBannerList);
  createAlert('Saved');

}

function localStorageClear() {
  window.localStorage.clear();
  removeBnnersFromDom(document.getElementById('banners-list'));
  localBannerList = [];
  createAlert('Cleared');
}

function printBanners(bannerList) {


  bannerList.forEach((banner, index) => {
    let linkElement = document.createElement('a');
    linkElement.href = banner.redirectLink;
    let newBanner = document.createElement('img');
    newBanner.src = banner.imageUrl;
    newBanner.id = index;
    newBanner.classList.add('banner');
    linkElement.appendChild(newBanner);

    let bannersListDiv = document.getElementById('banners-list');
    bannersListDiv.appendChild(linkElement);
  });

}

function removeBnnersFromDom(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function createAlert(alertContent){
  let div = document.createElement('div');
  let p = document.createElement('p');

  div.id = 'alert';
  p.textContent  = alertContent;

  div.appendChild(p);
  document.body.appendChild(div);

  setTimeout(()=>{
    document.getElementById('alert').parentNode.removeChild(document.getElementById('alert'));
  }, 1000);
  clearInterval();
}

function getLocalStorage(){
  return JSON.parse(window.localStorage.getItem('banners-data'));
}

function localStorageDetected(){
  if (Array.isArray(getLocalStorage())) {
    return true;
  }
  else{
    return false;
  }
}
