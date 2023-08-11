import Category from '@/components/Category';
import { CategoryProvider } from '@/store/CategoryProvider';
import { SelectedIdProvider } from '@/store/SelectedIdProvider';

export default function CategoryManagementPage() {
  return (
    <>
      <CategoryProvider>
        <SelectedIdProvider>
          <Category />
        </SelectedIdProvider>
      </CategoryProvider>
    </>
  );
}
