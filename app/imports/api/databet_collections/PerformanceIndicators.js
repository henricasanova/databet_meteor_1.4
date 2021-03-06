import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { DatabetCollection} from './DatabetCollection';
import { CurriculumMappings} from './CurriculumMappings';

class PerformanceIndicatorsCollection extends DatabetCollection {

  remove_document(doc_id, callback) {

    var doc = this.findOne({"_id": doc_id});
    var outcome_id = doc.student_outcome;

    // Removing referencing CurriculumMappings
    var referencing_ids = CurriculumMappings.get_selected_doc_ids({performance_indicator: doc_id});
    _.each(referencing_ids, function(e) { CurriculumMappings.remove_document(e); });


    super.remove_document(doc_id, callback);

    // Collection-specific: Fix all orders
    var i;
    var allPIs = this.find({"student_outcome": outcome_id}, {sort: {order: 1}}).fetch();
    for (i = 0; i < allPIs.length; i++) {
      this.update_document( allPIs[i]._id, {"order": i});
    }
  }
}


export const PerformanceIndicators = new PerformanceIndicatorsCollection("PerformanceIndicators");


PerformanceIndicators.attachSchema(new SimpleSchema({
  _id: {
    type: String,
    optional: false
  },
  description: {
    type: String,
    optional: false,
  },
  order: {
    type: Number,
    optional: false
  },
  student_outcome: {
    type: String,
    optional: false
  }
}));





