var dialogService = angular.module("dialogService", [
  "ngDialog",
]);

dialogService.factory("Dialog", [
  "ngDialog",
  function (ngDialog) {
    return {
      openedDialog: "",
      open: function (seqId, global, sequences, scope) {
        global.seqError = false;
        global.dialogOpen = true;

        if (seqId || seqId === 0) {
          global.id = seqId;
          global.editSeq = angular.copy(sequences[seqId]);
          global.deleteDisable = false;
        } else {
          global.id = -1;
          global.editSeq = { name: '', structure: '', prob: 0, rate: 0 }
          global.deleteDisable = true;
        }

        this.openedDialog = ngDialog.open({
          template: "popup.html",
          className: "ngdialog-theme-default",
          scope: scope,
        });
      },
      close: function (global) {
        this.openedDialog.close();
        global.dialogOpen = false;

        return true;
      },
    };
  },
]);