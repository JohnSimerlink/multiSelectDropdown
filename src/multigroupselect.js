const MULTI_SELECT_CLASS_NAME = 'group_multiselect'
const DROPDOWN_CARET_DOWN_CLASS_NAME = 'dropdown_caret_down'
const DROPDOWN_CARET_UP_CLASS_NAME = 'dropdown_caret_up'

ready(() => {
	init()
})

function init() {
	const mulitselectElements = document.querySelector('.' + CLASS_NAME)
	;[].forEach.call(mulitselectElements, makeMultiGroupSelect)
}

function makeMultiGroupSelect(el) {
	new MultiGroupSelect(el)
}
function MultiGroupSelect(el){
	// const multiselectElement = document.querySelector(selector)
	console.log('instantiating a new multiGroupSelect el')

}

function createDropdownButton(multiselectElement,){
	const fakeDropdown = document.createElement('div')
	fakeDropdown.classList = "group_multiselect_title"

	fakeDropdown.textContent = multiselectElement.getAttribute('data-label')
	const icon = document.createElement('i')
	icon.classList = 'dropdown_caret_down'

	fakeDropdown.addEventListener('click',() => {
		icon.classList = icon.classList.indexOf(DROPDOWN_CARET_DOWN_CLASS_NAME) > -1 ? DROPDOWN_CARET_UP_CLASS_NAME : DROPDOWN_CARET_UP_CLASS_NAME
	})
	const multiselectElementParent = multiselectElement.parentNode

	multiselectElementParent.insertBefore(multiselectElement, fakeDropdown)

}


function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState != 'loading')
        fn();
    });
  }
}