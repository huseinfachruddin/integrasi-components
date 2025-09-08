import "@/style.css";

import Spinner from "@/components/basics/Spinner.vue";
import Selector from "@/components/Form/Selector.vue";
import Table from "@/components/Table/index.vue";
import TablePagination from "@/components/Table/Pagination.vue";
import TableLimitor from "@/components/Table/LimitSelector.vue";
import WYSWYG from "@/components/Form/WYSWYG.vue";
import Button from "@/components/Button/index.vue";
import DatePicker from "@/components/Form/DatePicker.vue";
import DateRangePicker from "@/components/Form/DateRangePicker.vue";
import FileUpload from "@/components/Form/FileUpload.vue";
import Input from "@/components/Form/Input.vue";
import Radio from "@/components/Form/Radio.vue";
import Toggle from "@/components/Form/Toggle.vue";
import Tab from "@/components/basics/Tab.vue";
import Toast from "@/components/basics/Toast.vue";
import Badge from "@/components/basics/Badge.vue";
import Tooltip from "./components/basics/Tooltip.vue";

const components = {
  Spinner,
  Table,
  TablePagination,
  TableLimitor,
  Selector,
  WYSWYG,
  Button,
  DatePicker,
  DateRangePicker,
  FileUpload,
  Input,
  Radio,
  Toggle,
  Tab,
  Toast,
  Badge,
  Tooltip
};

export {
  Spinner,
  Table,
  TablePagination,
  TableLimitor,
  Selector,
  WYSWYG,
  Button,
  DatePicker,
  DateRangePicker,
  FileUpload,
  Input,
  Radio,
  Toggle,
  Tab,
  Toast,
  Badge,
  Tooltip
};

export default {
  install(app) {
    Object.values(components).forEach((component) => {
      if (component.name) {
        app.component(component.name, component);
      } else {
        console.warn("Komponen tidak punya name:", component);
      }
    });
  },
};
