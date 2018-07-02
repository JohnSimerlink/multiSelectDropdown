const MULTI_SELECT_CLASS_NAME = 'mgs-group_multiselect'
const DROPDOWN_CARET_DOWN_CLASS_NAME = 'mgs-dropdown_caret_down'
const DROPDOWN_CARET_UP_CLASS_NAME = 'mgs-dropdown_caret_up'
const DROPDOWN_BUTTON_CLASS_NAME = "mgs-group_multiselect_button"
const DROPDOWN_DELETE_CLASS_NAME = "mgs-close"
const DROPDOWN_ICON_CONTAINER_CLASS_NAME = "mgs-icon-container"


const HIDDEN_CLASS_NAME = 'mgs-hidden'
console.log("multgroupselect js called")
ready(() => {
	init()
})

function init() {
	const multiselectElements = document.querySelectorAll('.' + MULTI_SELECT_CLASS_NAME)
	;[].forEach.call(multiselectElements, makeMultiGroupSelect)
}

function makeMultiGroupSelect(el) {
	new MultiGroupSelect(el)
}

class MultiGroupSelect {
	constructor(multiSelectElement){
		this.multiSelectElement = multiSelectElement
		this.defaultButtonText = multiSelectElement.getAttribute('data-label')
		this.id = Math.random()
		const self = this
		console.log(self.id, 'instantiating a new multiGroupSelect el', multiSelectElement)
		resizeMultiSelectElement(multiSelectElement)
		const dropdownButton = createDropdownButton(multiSelectElement, self)
		makeGroupsClickable(multiSelectElement)
		makeButtonTextDisplayClickedOptions(multiSelectElement, dropdownButton, self)
	}
	showX() {
		if (this.showingX) return
		this.showingX = true
		this.deleteIcon.classList.remove(HIDDEN_CLASS_NAME)
	}
	hideX() {
		this.showingX = false
		this.deleteIcon.classList.add(HIDDEN_CLASS_NAME)
	}
	unselectOptions() {
		const options = this.multiSelectElement.querySelectorAll('option')
		;[].forEach.call(options, option => option.selected = false)
		this.resetButtonText()
		this.hideX();

	}
	resetButtonText() {
		this.dropdownButtonText.textContent = this.defaultButtonText
	}
	makeDeleteIcon(){
		const deleteIcon = document.createElement('i')
		this.deleteIcon = deleteIcon

		deleteIcon.classList.add(DROPDOWN_DELETE_CLASS_NAME)
		deleteIcon.classList.add(HIDDEN_CLASS_NAME)


		deleteIcon.addEventListener('click', event => {
			event.stopPropagation()
			this.unselectOptions()
		})
	}
}

function createDropdownButton(multiselectElement,self){
	const dropdownButton = document.createElement('div')
	const dropdownButtonText = document.createElement('span')
	self.dropdownButtonText = dropdownButtonText
	self.resetButtonText()
	const body = document.querySelector('body')
	dropdownButton.classList = DROPDOWN_BUTTON_CLASS_NAME

	const arrowIcon = document.createElement('i')
	arrowIcon.classList.add(DROPDOWN_CARET_DOWN_CLASS_NAME)

	const iconContainer = document.createElement('span')
	iconContainer.classList.add(DROPDOWN_ICON_CONTAINER_CLASS_NAME)
	console.log("icon container class List", iconContainer.classList)
	self.makeDeleteIcon()

	dropdownButton.addEventListener('click', () => {
		toggleDropdown(multiselectElement, arrowIcon, self)
	})
	// close dropdown upon clicking somewhere else on the page
	body.addEventListener('click', (event) => {
		console.log("body click", event.target, multiselectElement)
		const target = event.target
		if (multiselectElement.contains(target)){
			console.log(self.id, 'the multiselect element contains the targt')
			return
		} 
		if (dropdownButton.contains(target)) {
			console.log(self.id, 'the dropdown button is the target',)
			return
		}
		// if not clicking on the dropdown||button right now, and the dropdown is open, then close the dropdown
		if (!self.closed) {
			toggleDropdown(multiselectElement, arrowIcon, self)
			console.log(self.id, 'the dropdown was just closed')
		} else {
			console.log(self.id, 'the dropdown was just open')
		}

	})

	dropdownButton.appendChild(dropdownButtonText)
	// append in reverse order because of row reverse flex direction
	iconContainer.appendChild(arrowIcon)
	iconContainer.appendChild(self.deleteIcon)


	dropdownButton.appendChild(iconContainer)

	const multiselectElementParent = multiselectElement.parentNode


	multiselectElementParent.insertBefore(dropdownButton, multiselectElement)

	// hide dropdown on it
	toggleDropdown(multiselectElement, arrowIcon, self)

	return dropdownButton

}
function makeGroupsClickable(selectElement){
	const groups = selectElement.querySelectorAll('optgroup')
	;[].forEach.call(groups, group => {
		group.addEventListener('click', (event) => {
			const target = event.target
			console.log('target tag name is', target.tagName)
			if (target.tagName.toLocaleLowerCase() !== 'optgroup') { 
				return
			}
			clickGroup(target)
		})
	})
}
function clickGroup(group){
	console.log("group is ", group)
	const options = group.querySelectorAll('option')
		console.log("options ", options)

	const hasAllOptionsSelected = [].every.call(options, option => option.selected)

	if (hasAllOptionsSelected) {
		[].forEach.call(options, option => option.selected = false)
	} else {
		[].forEach.call(options, option => option.selected = true)
	}
}
function toggleDropdown(multiselectElement, arrowIcon, self) {
	console.log(self.id, 'toggleDropdown started called. the closed state is now', self.closed)

	arrowIcon.className= arrowIcon.className.indexOf(DROPDOWN_CARET_DOWN_CLASS_NAME) > -1 ? DROPDOWN_CARET_UP_CLASS_NAME : DROPDOWN_CARET_DOWN_CLASS_NAME
	;multiselectElement.classList.contains(HIDDEN_CLASS_NAME) ? multiselectElement.classList.remove(HIDDEN_CLASS_NAME) : multiselectElement.classList.add(HIDDEN_CLASS_NAME)
	self.closed = !self.closed
	console.log(self.id, 'toggleDropdown ended called. the closed state is now', self.closed)

}
function resizeMultiSelectElement(selectElement) {
	console.log(		'resizeMultiSelectElement', selectElement)
	const MAX_ITEMS_DISPLAYED_AT_ONCE = 10
	const numOptions = selectElement.querySelectorAll('option').length
	const numGroups = selectElement.querySelectorAll('optgroup').length
	const numRows = numOptions + numGroups
	selectElement.size = numRows > MAX_ITEMS_DISPLAYED_AT_ONCE ? MAX_ITEMS_DISPLAYED_AT_ONCE: numRows
}

function makeButtonTextDisplayClickedOptions(multiSelectElement, button, self){
	multiSelectElement.addEventListener('click', event => {
		const values = [].reduce.call(multiSelectElement.options, (arr, option) => {
			if (option.selected) {
				arr.push(option.value)
			}
			return arr
		}, [])
		if (values.length === 0) {
			self.resetButtonText()
			self.hideX()
		} else {
			self.dropdownButtonText.textContent = values.length + " item(s) selected"
			self.showX()
		}
		console.log('values', values)
	})
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