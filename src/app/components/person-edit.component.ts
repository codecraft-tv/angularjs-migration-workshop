import * as angular from 'angular';


export let PersonEditComponent = {
  selector: 'personEdit',
  template: `
<div class="col-md-8 col-md-offset-2" >
	<form class="form-horizontal"
	      ng-submit="$ctrl.save()"
	      novalidate >
		<div class="panel panel-default" >
			<div class="panel-heading" >
				Edit
				<div class="pull-right" >
					<button class="btn btn-primary btn-sm"
					        ladda="$ctrl.contacts.isSaving"
					        type="submit" >
						<span >Save</span >
					</button >

					<button class="btn btn-danger btn-sm"
					        ladda="$ctrl.contacts.isDeleting"
					        ng-click="$ctrl.remove()" >Delete
					</button >
				</div >
				<div class="clearfix" ></div >

			</div >
			<div class="panel-body" >

				<ng-include src="'templates/form.html'" ></ng-include >

			</div >
		</div >
	</form >
</div > 
`,
  bindings: {},
  controller: class PersonCreateController {

    public contacts = null;
    public person = {};

    private $state = null;
    private $stateParams = null;

    constructor($stateParams, $state, ContactService) {
      this.$stateParams = $stateParams;
      this.$state = $state;
      this.contacts = ContactService;
      this.person = this.contacts.getPerson(this.$stateParams.email);
    }

    save() {
      this.contacts.updateContact(this.person)
          .then(() => {
            this.$state.go("list");
          })
    }

    remove() {
      this.contacts.removeContact(this.person)
          .then(() => {
            this.$state.go("list");
          })
    }

  }
};

angular
    .module('codecraft')
    .component(PersonEditComponent.selector, PersonEditComponent);