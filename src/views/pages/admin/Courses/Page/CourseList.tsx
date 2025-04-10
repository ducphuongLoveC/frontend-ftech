import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, styled, TablePagination, Typography, useTheme, List, ListItem } from '@mui/material';
import { More } from '@mui/icons-material';
import moment from 'moment';
// import * as _ from 'lodash';
import HeadlessTippy from '@tippyjs/react/headless';
// my pj
import CourseListSkl from '@/ui-component/cards/Skeleton/CourseListSkl';
import HeaderTitle from '../../Title';
import path from '@/constants/routes';
import { Course } from '@/interfaces/course';
import FilterComponent from '@/components/Filter';
import { getCourseList } from '@/api/courseApi';
import { useState } from 'react';
import { fetchLearningPaths } from '@/api/learningPathApi';
import Wrapper from '@/components/Wrapper';

const BoxBetween = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '25px',
}));

const CourseList: React.FC = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  const [params, setParams] = useState({});

  const queries = useQueries({
    queries: [
      {
        queryKey: ['courses', params],
        queryFn: () => getCourseList(params),
      },
      {
        queryKey: ['learning_paths'],
        queryFn: fetchLearningPaths,
      },
    ],
  });

  const { data: courses, isLoading: isLoadingCourses } = queries[0];
  const learningPaths = queries[1];

  const filterLearningPathList = useMemo(() => {
    return learningPaths?.data?.map((l: any) => ({ display: l.title, value: l._id }));
  }, [learningPaths]);

  if (isLoadingCourses) return <CourseListSkl />;

  const handleSetParams = (params: any) => {
    const { search, ...rest } = params;

    const transform = Object.entries(rest).reduce((acc: any, [key, values]: [string, any]) => {
      acc[key] = values.map(({ value }: { value: string }) => value).join(',');
      return acc;
    }, {});

    setParams({ ...transform, search });
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
    setParams((pre) => {
      return { ...pre, page: newPage };
    });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    setParams((pre) => {
      return { ...pre, limit: newRowsPerPage };
    });
  };

  const CourseDuration = (course: any) => {
    const totalDuration = course.modules.reduce((moduleAcc: number, module: any) => {
      return (
        moduleAcc +
        module.resources.reduce((resourceAcc: number, resource: any) => {
          return resourceAcc + resource.duration;
        }, 0)
      );
    }, 0);

    return <div>{moment.utc(totalDuration * 1000).format('HH:mm:ss')}</div>;
  };

  const CourseResourceTotal = (course: any) => {
    const resourceTotal = course.modules.reduce((moduleAcc: number, module: any) => {
      return moduleAcc + module.resources.length;
    }, 0);

    return resourceTotal;
  };

  return (
    <Box>
      <HeaderTitle
        des='Chức năng "Danh sách khóa học" giúp cho quản trị có cái
        nhìn tổng quan về các khóa học trong hệ thống, và có thể thao tác với những nguồn tài nguyên đó.'
        titleButton="Tạo khóa học"
        link={path.admin.newCourse}
      />
      <FilterComponent
        filters={[
          {
            displayName: 'Danh mục',
            name: 'learning_paths',
            values: filterLearningPathList,
          },
          {
            displayName: 'Loại khóa học',
            name: 'types',
            values: [
              { display: 'Tính phí', value: false },
              { display: 'Miễn phí', value: true },
            ],
          },
        ]}
        onFilter={handleSetParams}
      />

      <Grid container spacing={2}>
        {courses?.data?.length ? (
          courses?.data?.map((course: Course) => (
            <Grid key={course._id} item sm={12} md={6}>
              <Box sx={{ backgroundColor: theme.palette.background.paper }} p={2}>
                <BoxBetween>
                  <Typography variant="h3">{course.title}</Typography>
                  <HeadlessTippy
                    placement="bottom-end"
                    trigger="click"
                    interactive
                    allowHTML
                    render={({ attrs }: any) => (
                      <Wrapper sx={{ p: 0 }} {...attrs}>
                        <List sx={{ p: 0 }}>
                          <ListItem>
                            <Link to={'/admin/courses/statistics/' + course._id}>Xem chi tiết</Link>
                          </ListItem>
                          {/* <ListItem><Link to={path.admin.courseStatistics(course._id)}>Xóa</Link></ListItem> */}
                        </List>
                      </Wrapper>
                    )}
                  >
                    <More sx={{ cursor: 'pointer' }} />
                  </HeadlessTippy>
                </BoxBetween>

                <Grid container spacing={3}>
                  <Grid item lg={6}>
                    <Grid container spacing={2}>
                      <Grid item>
                        {course.thumbnail && (
                          <img width={'100%'} src={typeof course.thumbnail === 'string' ? course.thumbnail : ''} />
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          fullWidth
                          component={Link}
                          to={path.admin.updateCourse(course._id ? course._id : '')}
                          variant="outlined"
                        >
                          Xem và sửa khóa học
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg={6}>
                    <BoxBetween>
                      <Typography>Tổng thời gian</Typography>
                      <Typography>{CourseDuration(course)}</Typography>
                    </BoxBetween>
                    <BoxBetween>
                      <Box>Số lượng chương</Box>
                      <Box>{course.modules.length}</Box>
                    </BoxBetween>
                    <BoxBetween>
                      <Box>Số lượng tài liệu</Box>
                      <Box>{CourseResourceTotal(course)}</Box>
                    </BoxBetween>
                    <BoxBetween>
                      <Box>Loại khóa học</Box>
                      <Box>{course.isFree ? 'Miễn phí' : 'Tính phí'}</Box>
                    </BoxBetween>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }} justifyContent={'center'}>
            <Typography>Hong tìm thấy khóa học</Typography>
          </Grid>
        )}
      </Grid>
      <TablePagination
        rowsPerPageOptions={[4, 8, 20]}
        component="div"
        count={courses.pagination.totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
export default CourseList;
