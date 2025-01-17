import { NgModule } from '@angular/core';
import {
  AlertOctagon,
  ArrowLeft,
  Check,
  CheckSquare,
  ChevronRight,
  Clipboard,
  Coffee,
  Edit2,
  ExternalLink,
  Eye,
  FileText,
  Film,
  Headphones,
  Heart,
  MessageSquare,
  Minus,
  Play,
  Plus,
  RefreshCcw,
  Star,
  Square,
  Tool,
  Trash2,
  TrendingUp,
  User,
  UserX,
  Volume1,
  Volume2,
  VolumeX,
  Volume,
  X,
  XOctagon,
  XSquare,
} from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

// https://github.com/michaelbazos/angular-feather#available-icons
const icons = {
  /* eslint-disable @typescript-eslint/naming-convention */
  AlertOctagon,
  ArrowLeft,
  Check,
  CheckSquare,
  ChevronRight,
  Clipboard,
  Coffee,
  Edit2,
  ExternalLink,
  Eye,
  FileText,
  Film,
  Headphones,
  Heart,
  MessageSquare,
  Minus,
  Play,
  Plus,
  RefreshCcw,
  Star,
  Square,
  Tool,
  Trash2,
  TrendingUp,
  User,
  UserX,
  Volume1,
  Volume2,
  VolumeX,
  Volume,
  X,
  XOctagon,
  XSquare,
  /* eslint-enable @typescript-eslint/naming-convention */
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
